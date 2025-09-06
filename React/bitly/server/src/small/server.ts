import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { fetchUrlByIdSql, fetchUrlByUrlSql, insertSql, query } from './db';

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = ALPHABET.length;

const app: Express = express();
const port: number = Number(process.env.PORT) || 7500;

app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
});
app.use(limiter);

app.use(express.json());

function cleanUrl(raw: string) {
    const u = new URL(raw);
    if (!/^https?:$/.test(u.protocol)) throw new Error("Only http/https allowed");
    return u.toString();
}

function encrypt(index: number) {
    if (index === 0) return "0";
    let code = "";
    while (index > 0) {
        code = ALPHABET[index % BASE] + code;
        index = Math.floor(index / BASE);
    }
    return code;
}

function decrypt(code: string) {
    let n = 0;
    for (const ch of code) {
        const i = ALPHABET.indexOf(ch);
        if (i === -1) throw new Error("Invalid short code");
        n = n * BASE + i;
    }
    return n;
}

app.post("/api/shorten", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { longUrl } = request.body;
        const cleanedUrl = cleanUrl(longUrl);
        const inserted = await query(insertSql, [cleanedUrl]);
        let urlId;
        if (inserted.rowCount! > 0 && inserted.rows[0]) {
            urlId = (inserted.rows[0] as any).id;
        } else {
            const existing = await query(fetchUrlByUrlSql, [cleanedUrl]);
            urlId = (existing.rows[0] as any).id;
        }
        const code = encrypt(Number(urlId));
        const shortUrl = `${request.protocol}://${request.get("host")}/api/${code}`;
        response.status(200).json(JSON.stringify({ shortUrl: shortUrl }));
    } catch (error) {
        response.status(400).json({ error: "Error shortening url" })
    }
});

app.get("/api/:code", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { code } = request.params;
        let id;
        id = decrypt(code);
        const urlRow = await query(fetchUrlByIdSql, [id]);
        if (urlRow.rowCount === 0) {
            response.status(404).send("Url Not found");
        }
        const fullUrl = (urlRow.rows[0] as any).original_url;
        if (fullUrl) {
            response.redirect(301, fullUrl);
        } else {
            response.status(404).send("Url Not found");
        }
    } catch (error) {
        response.status(400).json({ error: "Error fetching url" })
    }
});


app.use((req: Request, res: Response) => res.status(404).json({ error: 'Not found' }));


app.listen(port, () => console.log(`http://localhost:${port}`));

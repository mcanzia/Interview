"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = ALPHABET.length;
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 7500;
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200
});
app.use(limiter);
app.use(express_1.default.json());
function cleanUrl(raw) {
    const u = new URL(raw);
    if (!/^https?:$/.test(u.protocol))
        throw new Error("Only http/https allowed");
    return u.toString();
}
function encrypt(index) {
    if (index === 0)
        return "0";
    let code = "";
    while (index > 0) {
        code = ALPHABET[index % BASE] + code;
        index = Math.floor(index / BASE);
    }
    return code;
}
function decrypt(code) {
    let n = 0;
    for (const ch of code) {
        const i = ALPHABET.indexOf(ch);
        if (i === -1)
            throw new Error("Invalid short code");
        n = n * BASE + i;
    }
    return n;
}
app.post("/api/shorten", async (request, response, next) => {
    try {
        const { longUrl } = request.body;
        const cleanedUrl = cleanUrl(longUrl);
        const inserted = await (0, db_1.query)(db_1.insertSql, [cleanedUrl]);
        let urlId;
        if (inserted.rowCount > 0 && inserted.rows[0]) {
            urlId = inserted.rows[0].id;
        }
        else {
            const existing = await (0, db_1.query)(db_1.fetchUrlByUrlSql, [cleanedUrl]);
            urlId = existing.rows[0].id;
        }
        const code = encrypt(Number(urlId));
        const shortUrl = `${request.protocol}://${request.get("host")}/api/${code}`;
        response.status(200).json(JSON.stringify({ shortUrl: shortUrl }));
    }
    catch (error) {
        response.status(400).json({ error: "Error shortening url" });
    }
});
app.get("/api/:code", async (request, response, next) => {
    try {
        const { code } = request.params;
        let id;
        id = decrypt(code);
        const urlRow = await (0, db_1.query)(db_1.fetchUrlByIdSql, [id]);
        if (urlRow.rowCount === 0) {
            response.status(404).send("Url Not found");
        }
        const fullUrl = urlRow.rows[0].original_url;
        if (fullUrl) {
            response.redirect(301, fullUrl);
        }
        else {
            response.status(404).send("Url Not found");
        }
    }
    catch (error) {
        response.status(400).json({ error: "Error fetching url" });
    }
});
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.listen(port, () => console.log(`http://localhost:${port}`));

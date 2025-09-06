import { Request } from "express";
import { Url } from "./Url";
import { UrlDao } from "./UrlDao";

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = ALPHABET.length;

export class UrlService {

    constructor() {
    }

    encrypt(index: number) {
        if (index === 0) return "0";
        let code = "";
        while (index > 0) {
            code = ALPHABET[index % BASE] + code;
            index = Math.floor(index / BASE);
        }
        return code;
    }

    decrypt(code: string) {
        let n = 0;
        for (const ch of code) {
            const i = ALPHABET.indexOf(ch);
            if (i === -1) throw new Error("Invalid short code");
            n = n * BASE + i;
        }
        return n;
    }

    normalizeUrl(raw: string) {
        const u = new URL(raw);
        if (!/^https?:$/.test(u.protocol)) throw new Error("Only http/https allowed");
        return u.toString();
    }

    async shortenUrl(request: Request, url: Url) {
        const cleanedUrl = this.normalizeUrl(url.longUrl);
        const urlDao = new UrlDao();
        const inserted = await urlDao.insertOriginalUrl(cleanedUrl);
        let urlId;
        if (inserted.rowCount! > 0 && inserted.rows[0]) {
            urlId = (inserted.rows[0] as any).id;
        } else {
            const existing = await urlDao.fetchUrlByUrl(cleanedUrl);
            urlId = (existing.rows[0] as any).id;
        }
        const code = this.encrypt(Number(urlId));
        const shortUrl = `${request.protocol}://${request.get("host")}/api/${code}`;
        const updatedUrl: Url = new Url(cleanedUrl, shortUrl);
        return updatedUrl;
    }

    async fetchUrl(code: string) {
        let id;
        try {
            id = this.decrypt(code);
        } catch (error) {
            return null;
        }

        const urlDao = new UrlDao();
        const urlRow = await urlDao.fetchUrlById(id);
        if (urlRow.rowCount === 0) {
            return null;
        }
        return (urlRow.rows[0] as any).original_url;
    }

}
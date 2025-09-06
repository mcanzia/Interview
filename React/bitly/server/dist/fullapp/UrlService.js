"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const Url_1 = require("./Url");
const UrlDao_1 = require("./UrlDao");
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = ALPHABET.length;
class UrlService {
    constructor() {
    }
    encrypt(index) {
        if (index === 0)
            return "0";
        let code = "";
        while (index > 0) {
            code = ALPHABET[index % BASE] + code;
            index = Math.floor(index / BASE);
        }
        return code;
    }
    decrypt(code) {
        let n = 0;
        for (const ch of code) {
            const i = ALPHABET.indexOf(ch);
            if (i === -1)
                throw new Error("Invalid short code");
            n = n * BASE + i;
        }
        return n;
    }
    normalizeUrl(raw) {
        const u = new URL(raw);
        if (!/^https?:$/.test(u.protocol))
            throw new Error("Only http/https allowed");
        return u.toString();
    }
    async shortenUrl(request, url) {
        const cleanedUrl = this.normalizeUrl(url.longUrl);
        const urlDao = new UrlDao_1.UrlDao();
        const inserted = await urlDao.insertOriginalUrl(cleanedUrl);
        let urlId;
        if (inserted.rowCount > 0 && inserted.rows[0]) {
            urlId = inserted.rows[0].id;
        }
        else {
            const existing = await urlDao.fetchUrlByUrl(cleanedUrl);
            urlId = existing.rows[0].id;
        }
        const code = this.encrypt(Number(urlId));
        const shortUrl = `${request.protocol}://${request.get("host")}/api/${code}`;
        const updatedUrl = new Url_1.Url(cleanedUrl, shortUrl);
        return updatedUrl;
    }
    async fetchUrl(code) {
        let id;
        try {
            id = this.decrypt(code);
        }
        catch (error) {
            return null;
        }
        const urlDao = new UrlDao_1.UrlDao();
        const urlRow = await urlDao.fetchUrlById(id);
        if (urlRow.rowCount === 0) {
            return null;
        }
        return urlRow.rows[0].original_url;
    }
}
exports.UrlService = UrlService;

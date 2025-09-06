import { Request, Response, NextFunction } from "express";
import { UrlService } from "./UrlService";
import { Url } from "./Url";

export class UrlController {

    constructor() {
    }

    async testUrl(request: Request, response: Response, next: NextFunction) {
        try {
            response.status(200).json(JSON.stringify("Success"));
        } catch (error) {
            console.log("Error", error);
        }
    }

    async shortenUrl(request: Request, response: Response, next: NextFunction) {
        try {
            const url: Url = request.body;
            const urlService = new UrlService();
            const updatedUrl: Url = await urlService.shortenUrl(request, url);
            response.status(200).json(JSON.stringify({ shortUrl: updatedUrl.shortUrl }));
        } catch (error) {
            console.log("Error", error);
        }
    }

    async fetchUrl(request: Request, response: Response, next: NextFunction) {
        try {
            const { code } = request.params;
            const urlService = new UrlService();
            const fullUrl = await urlService.fetchUrl(code);
            if (fullUrl) {
                response.redirect(301, fullUrl);
            } else {
                response.status(404).send("Url Not found");
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

}
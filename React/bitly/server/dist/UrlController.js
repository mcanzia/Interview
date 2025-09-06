"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlController = void 0;
const UrlService_1 = require("./UrlService");
class UrlController {
    constructor() {
    }
    async testUrl(request, response, next) {
        try {
            response.status(200).json(JSON.stringify("Success"));
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    async shortenUrl(request, response, next) {
        try {
            const url = request.body;
            const urlService = new UrlService_1.UrlService();
            const updatedUrl = await urlService.shortenUrl(request, url);
            response.status(200).json(JSON.stringify(updatedUrl));
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    async fetchUrl(request, response, next) {
        try {
            const { code } = request.params;
            const urlService = new UrlService_1.UrlService();
            const fullUrl = await urlService.fetchUrl(code);
            if (fullUrl) {
                response.redirect(301, fullUrl);
            }
            else {
                response.status(404).send("Url Not found");
            }
        }
        catch (error) {
            console.log("Error", error);
        }
    }
}
exports.UrlController = UrlController;

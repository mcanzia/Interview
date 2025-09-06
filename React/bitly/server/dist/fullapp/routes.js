"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UrlController_1 = require("./UrlController");
const router = express_1.default.Router();
router.use(express_1.default.json());
const urlController = new UrlController_1.UrlController();
router.get('/', urlController.testUrl);
router.post('/shorten', urlController.shortenUrl);
router.get('/:code', urlController.fetchUrl);
exports.default = router;

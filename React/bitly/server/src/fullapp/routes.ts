import express, { Request, Response, NextFunction } from 'express';
import { UrlController } from './UrlController';

const router = express.Router();

router.use(express.json());

const urlController = new UrlController();

router.get('/', urlController.testUrl);
router.post('/shorten', urlController.shortenUrl);
router.get('/:code', urlController.fetchUrl);

export default router;
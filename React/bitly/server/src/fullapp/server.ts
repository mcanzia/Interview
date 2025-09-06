import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import router from './routes';

const app: Express = express();
const port: number = Number(process.env.PORT) || 7500;

app.use(cors());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
});
app.use(limiter);

app.use('/api', router);

app.use('/test', (req: Request, res: Response) => res.status(200).json({ message: 'Found' }));


app.use((req: Request, res: Response) => res.status(404).json({ error: 'Not found' }));

//Error Handling
// app.use((error: CustomError, request: Request, response: Response, next: NextFunction) => {
//     ErrorHandler.handleError(error, response);
// });

app.listen(port, () => console.log(`http://localhost:${port}`));

// app.listen(port, () => {
//     Logger.info(`Listen to requests on http://localhost:${port}`);
//   });

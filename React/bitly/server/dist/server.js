"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 7500;
app.use((0, cors_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200
});
app.use(limiter);
app.use('/api', routes_1.default);
app.use('/test', (req, res) => res.status(200).json({ message: 'Found' }));
app.use((req, res) => res.status(404).json({ error: 'Not found' }));
//Error Handling
// app.use((error: CustomError, request: Request, response: Response, next: NextFunction) => {
//     ErrorHandler.handleError(error, response);
// });
app.listen(port, () => console.log(`http://localhost:${port}`));
// app.listen(port, () => {
//     Logger.info(`Listen to requests on http://localhost:${port}`);
//   });

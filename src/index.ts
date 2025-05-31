import dotenv from 'dotenv';
import express from 'express';
import { loggerMiddleware } from './middlewares';
import { statementRouter } from './routers';

// env variables
dotenv.config();

const port = process.env.APP_PORT as string;
const app = express();

// middlewares
app.use(loggerMiddleware);
app.use(express.json());

// routers
app.use('/statement', statementRouter);

// run app
app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
});

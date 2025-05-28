import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

// Загрузка переменных окружения из .env файла
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.APP_PORT || 4000;

app.get('/', (req: Request, res: Response) => {});

app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
});

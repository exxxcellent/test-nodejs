import express, { Request, Response } from 'express';
import { PrismaClient, Statement } from '../../generated/prisma';
import { bodyMiddleware } from '../middlewares';
import { StatementService } from '../services';
import { Messages } from '../types';

const prismaClient = new PrismaClient();
const statementService = new StatementService(prismaClient);
export const statementRouter = express.Router();

statementRouter.get('/', async (req: Request, res: Response) => {
    const statements = await statementService.getAll(req.query);
    if (typeof statements === 'string') {
        res.status(200).json({ message: statements });
        return;
    }
    res.status(200).json(statements);
});

statementRouter.post(
    '/',
    bodyMiddleware,
    async (req: Request, res: Response) => {
        const statement = await statementService.create(req.body as Statement);
        res.status(201).json(statement);
    }
);

statementRouter.post('/:id/start', async (req: Request, res: Response) => {
    const { id } = req.params;
    const statement = await statementService.startStatement(id);
    res.status(200).json(statement);
});

statementRouter.post(
    '/:id/complete',
    bodyMiddleware,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const statement = await statementService.completeStatement(
            id,
            req.body as { message: string }
        );
        res.status(200).json(statement);
    }
);

statementRouter.post('/all/cancel', async (req: Request, res: Response) => {
    await statementService.cancelAllStatements();
    res.status(200).json({ message: Messages.ALL_STATEMENTS_CANCELED });
});

statementRouter.post(
    '/:id/cancel',
    bodyMiddleware,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const statement = await statementService.cancelStatement(
            id,
            req.body as { message: string }
        );
        res.status(200).json(statement);
    }
);

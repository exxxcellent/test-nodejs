import { endOfDay, startOfDay } from 'date-fns';
import { PrismaClient, Statement, Status } from '../../generated/prisma';
import { Errors, Messages, QueryStatements } from '../types';

export class StatementService {
    private prisma: PrismaClient;

    constructor(public prismaClient: PrismaClient) {
        if (!prismaClient) {
            throw new Error(Errors.PRISMA_CLIENT_REQUIRED);
        }
        this.prisma = prismaClient;
    }

    async getById(id: string) {
        if (!id) throw new Error(Errors.STATEMENT_ID_REQUIRED);
        const statement = await this.prisma.statement.findUnique({
            where: { id },
        });
        if (!statement) {
            return Errors.STATEMENT_NOT_FOUND;
        }
        return statement;
    }

    async getAll(query: QueryStatements): Promise<Statement[] | string> {
        const from = new Date(query.from || new Date());
        const to = new Date(query.to || new Date());
        const date = new Date(query.date || new Date());

        const fromTo = {
            gte: query.from ? from : undefined,
            lte: query.to ? to : undefined,
        };

        const targetDate = {
            gte: query.date ? startOfDay(date) : undefined,
            lte: query.date ? endOfDay(date) : undefined,
        };

        if (from > to) {
            return Errors.INVALID_DATE_RANGE;
        }

        const filter = query.date ? targetDate : fromTo;

        const statements = await this.prisma.statement.findMany({
            where: {
                createdAt: {
                    ...filter,
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        if (!statements) return Messages.STATEMENTS_NOT_FOUND;
        return statements;
    }

    async create({ body, theme }: Statement) {
        try {
            return await this.prisma.statement.create({
                data: {
                    body,
                    theme,
                },
            });
        } catch (error) {
            throw new Error(Errors.ERROR_CREATING_STATEMENT);
        }
    }

    async startStatement(id: string) {
        await this.getById(id);
        try {
            return await this.prisma.statement.update({
                where: { id },
                data: { status: Status.IN_PROGRESS },
            });
        } catch (error) {
            throw new Error(Errors.ERROR_STARTING_STATEMENT);
        }
    }

    async completeStatement(id: string, { message }: { message: string }) {
        await this.getById(id);
        try {
            return await this.prisma.statement.update({
                where: { id },
                data: {
                    status: Status.COMPLETED,
                    message,
                },
            });
        } catch (error) {
            throw new Error(Errors.ERROR_UPDATING_STATEMENT);
        }
    }

    async cancelStatement(id: string, { message }: { message: string }) {
        await this.getById(id);
        try {
            return await this.prisma.statement.update({
                where: { id },
                data: {
                    status: Status.CANCELED,
                    message,
                },
            });
        } catch (error) {
            throw new Error(Errors.ERROR_CANCELLING_STATEMENT);
        }
    }

    async cancelAllStatements() {
        try {
            await this.prisma.statement.updateMany({
                where: {
                    status: Status.IN_PROGRESS,
                },
                data: {
                    status: Status.CANCELED,
                },
            });
        } catch (error) {
            throw new Error(Errors.ERROR_CANCELLING_ALL_STATEMENTS);
        }
    }
}

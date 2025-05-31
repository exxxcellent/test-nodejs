import { NextFunction, Request, Response } from 'express';

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(
        `[${new Date().toLocaleString()}]`,
        req.method,
        res.statusCode,
        req.url
    );
    next();
};

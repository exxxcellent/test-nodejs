import { NextFunction, Request, Response } from 'express';
import { Errors } from '../types';

export const bodyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) {
        res.status(400).json({ error: Errors.REQUEST_BODY_REQUIRED });
        return;
    }
    next();
};

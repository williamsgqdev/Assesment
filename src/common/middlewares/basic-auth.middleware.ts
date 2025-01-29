import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enums";

export function basicAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        res.status(HttpStatusCode.UN_AUTHORIZED).json({
            message: "Authentication required"
        })
        return;
    }

    const [scheme, credentials] = authHeader.split(' ');
    if(scheme !== 'Basic'){
        res.status(HttpStatusCode.UN_AUTHORIZED).json({
            message: "Invalid authentication scheme"
        })
        return;
    }

    const decoded = Buffer.from(credentials, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');
    

    if(username !== 'admin' || password !== 'pass'){
        res.status(HttpStatusCode.UN_AUTHORIZED).json({
            message: "Invalid credentials"
        })
        return;
    }

    next()
}
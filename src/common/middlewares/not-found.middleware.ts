import { Request, Response } from 'express';
import { HttpStatusCode } from '../enums';

export function notFoundMiddleware(req: Request, res: Response){
  res.status(HttpStatusCode.NOT_FOUND).send({message: '🚨 Route does not exist 🛠'});
};
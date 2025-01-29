import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { BadRequestException } from "./error.middleware";

export const validationPipe = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
           const validate = schema.parse({
              body: req.body,
              query: req.query,
              params: req.params,
            });
           req.body = validate.body;
           req.query = validate.query;
           req.params = validate.params;
        next();
        return;
      } catch (error) {
        if(error instanceof ZodError){
            throw new BadRequestException(error.issues.map((issue) => issue.message).join(', '));
        }
        res.status(500).json({
            message: 'Something went wrong'
        });
        return;
      }
};
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../enums";

abstract class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    
    constructor(name: string, httpCode: HttpStatusCode, message: string) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
    
      Error.captureStackTrace(this);
    }
}


export class InternalServerException extends BaseError {
      constructor(message = '!Oops, something went wrong'){
        super('INTERNAL SERVER ERROR', HttpStatusCode.INTERNAL_SERVER, message);
  }
}

export class BadRequestException extends BaseError {
      constructor(message: string){
          super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, message);
      }
}

export class NotFoundException extends BaseError {
    constructor(message: string){
      super('NOT FOUND', HttpStatusCode.NOT_FOUND, message);
    }
}


export function errorHandler(err: Error, _: Request, res: Response, next: NextFunction){
  console.log({err});
  
  if(err instanceof BaseError){
     res.status(err.httpCode).json({message: err.message});
     return;
  }

  res.status(HttpStatusCode.INTERNAL_SERVER).json({message: 'Something went wrong'})
}

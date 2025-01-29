import express, { Request, Response } from "express";
import { errorHandler, limiter, notFoundMiddleware, swaggerDocs } from "./common";
import helmet from "helmet";
import productRouter from './products/products.router';


export function createApp() {
  const app = express();
  app.use(helmet())
  app.use(express.json());
  swaggerDocs(app)
  app.use(limiter)
  app.get('/', (req: Request, res: Response)=> {
    res.status(200).json({
      message: '🚀 Live'
    })
  })

  app.use('/api/v1/products', productRouter)

  app.use(errorHandler)
  app.use('*', notFoundMiddleware);

  return app;
}
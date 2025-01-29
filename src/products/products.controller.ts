import { NextFunction, Request, Response } from "express";
import * as productService from './products.service'
import { CreateProductType, GetProductsType, GetProductType, UpdateProductType } from "./dto";
import { HttpStatusCode } from "../common/enums";

async function createProduct(req:Request<unknown, unknown, CreateProductType['body']>, res: Response, next: NextFunction){
    try {
       const data = await  productService.createProduct(req.body)
       res.status(HttpStatusCode.OK).json(data)
    } catch (error) {
        next(error)
    }
}

async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await productService.getProducts(req.query as unknown as GetProductsType['query'])
        res.status(HttpStatusCode.OK).json(data)
    } catch (error) {
        next(error)
    }
    
}

async function getProduct(req: Request<GetProductType['params'], unknown, unknown>, res: Response, next: NextFunction) {
    try {
        const data = await  productService.getProduct(req.params.id)
        res.status(HttpStatusCode.OK).json(data)
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req: Request<UpdateProductType['params'], unknown, UpdateProductType['body']>, res: Response, next: NextFunction) {
    try {
        const data = await productService.updateProduct(req.params.id, req.body);
        res.status(HttpStatusCode.OK).json(data);
    } catch (error) {
        next(error)
    }
}

async function deleteProduct(req: Request<GetProductType['params'], unknown, unknown>, res: Response, next: NextFunction) {
    try {
        const data = await productService.deleteProduct(req.params.id)
        res.status(HttpStatusCode.OK).json(data)
    } catch (error) {
        next(error)
    }
}




export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./products.controller";
import { basicAuth, validationPipe } from "../common";
import { CreateProductSchema, GetProductSchema, GetProductsSchema, UpdateProductSchema } from "./dto";

const router = Router();

/**
 * @openapi
 * paths:
 *   /api/v1/products:
 *     post:
 *       tags:
 *         - Product
 *       security:
 *         - basicAuth: []
 *       summary: Create a new product
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - price
 *                 - quantity
 *                 - category
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Sample Product"
 *                 price:
 *                   type: number
 *                   example: 1999.99
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   example: "A high-quality sample product."
 *                 quantity:
 *                   type: integer
 *                   example: 10
 *                 category:
 *                   type: string
 *                   example: "Electronics"
 *       responses:
 *         201:
 *           description: Product created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 201
 *                   message:
 *                     type: string
 *                     example: "Product created successfully"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       name:
 *                         type: string
 *                         example: "Sample Product"
 *                       price:
 *                         type: number
 *                         example: 1999.99
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "A high-quality sample product."
 *                       quantity:
 *                         type: integer
 *                         example: 10
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-29T12:00:00Z"
 *     get:
 *       tags:
 *         - Product
 *       summary: Get all products with filters and sorting
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 1
 *           required: false
 *           description: The page number for pagination.
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 10
 *           required: false
 *           description: The number of products per page.
 *         - in: query
 *           name: name
 *           schema:
 *             type: string
 *           required: false
 *           description: Filter by product name.
 *         - in: query
 *           name: sort_by_category
 *           schema:
 *             type: string
 *             enum: [asc, desc]
 *           required: false
 *           description: Sort products by category in ascending or descending order.
 *         - in: query
 *           name: sort_by_name
 *           schema:
 *             type: string
 *             enum: [asc, desc]
 *           required: false
 *           description: Sort products by name in ascending or descending order.
 *         - in: query
 *           name: sort_by_quantity
 *           schema:
 *             type: string
 *             enum: [asc, desc]
 *           required: false
 *           description: Sort products by quantity in ascending or descending order.
 *         - in: query
 *           name: sort_by_price
 *           schema:
 *             type: string
 *             enum: [asc, desc]
 *           required: false
 *           description: Sort products by price in ascending or descending order.
 *         - in: query
 *           name: low_price_range
 *           schema:
 *             type: number
 *             minimum: 0
 *           required: false
 *           description: Minimum price range filter.
 *         - in: query
 *           name: high_price_range
 *           schema:
 *             type: number
 *             minimum: 0
 *           required: false
 *           description: Maximum price range filter.
 *       responses:
 *         200:
 *           description: List of products retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 200
 *                   message:
 *                     type: string
 *                     example: "Products"
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                           example: "550e8400-e29b-41d4-a716-446655440000"
 *                         name:
 *                           type: string
 *                           example: "Sample Product"
 *                         price:
 *                           type: number
 *                           example: 1999.99
 *                         description:
 *                           type: string
 *                           nullable: true
 *                           example: "A high-quality sample product."
 *                         quantity:
 *                           type: integer
 *                           example: 10
 *                         category:
 *                           type: string
 *                           example: "Electronics"
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2025-01-29T12:00:00Z"
 * 
 * /api/v1/products/{id}:
 *     get:
 *       tags:
 *         - Product
 *       summary: Get a single product by ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: The ID of the product to retrieve.
 *       responses:
 *         200:
 *           description: Product retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 200
 *                   message:
 *                     type: string
 *                     example: "Product found"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       name:
 *                         type: string
 *                         example: "Sample Product"
 *                       price:
 *                         type: number
 *                         example: 1999.99
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "A high-quality sample product."
 *                       quantity:
 *                         type: integer
 *                         example: 10
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-29T12:00:00Z"
 * 
 *     patch:
 *       tags:
 *         - Product
 *       summary: Update a product by ID
 *       security:
 *         - basicAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: The ID of the product to update.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Updated Product Name"
 *                 price:
 *                   type: number
 *                   example: 2500.00
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   example: "An updated high-quality sample product."
 *                 quantity:
 *                   type: integer
 *                   example: 15
 *                 category:
 *                   type: string
 *                   example: "Home Appliances"
 *               additionalProperties: false
 *       responses:
 *         200:
 *           description: Product updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: number
 *                     example: 200
 *                   message:
 *                     type: string
 *                     example: "Product updated successfully"
 *                   data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       name:
 *                         type: string
 *                         example: "Updated Product Name"
 *                       price:
 *                         type: number
 *                         example: 2500.00
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "An updated high-quality sample product."
 *                       quantity:
 *                         type: integer
 *                         example: 15
 *                       category:
 *                         type: string
 *                         example: "Home Appliances"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-29T15:00:00Z"
 */



router.post('',basicAuth, validationPipe(CreateProductSchema) ,createProduct)
        .get('', validationPipe(GetProductsSchema), getProducts)
        
router.get('/:id', validationPipe(GetProductSchema), getProduct)
        .patch('/:id',basicAuth, validationPipe(UpdateProductSchema), updateProduct)
        .delete('/:id',basicAuth, validationPipe(GetProductSchema), deleteProduct)

export default router;
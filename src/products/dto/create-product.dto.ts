import { z } from "zod";

const CreateProductSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Product name is required",
            invalid_type_error: "Product name must be a text string"
        })
        .min(3, { message: "Product name must be at least 3 characters long" })
        .trim(),

        price: z.number({
            required_error: "Product price is required",
            invalid_type_error: "Price must be a valid number"
        })
        .positive({ message: "Price must be a positive number" })
        .gte(100, { message: "Price must be at least 100 naira" })
        .finite({ message: "Price must be a finite number" }),

        description: z.string({
            invalid_type_error: "Description must be a text string"
        })
        .nullish().optional(),

        quantity: z.number({
            required_error: "Product quantity is required",
            invalid_type_error: "Quantity must be a valid number"
        })
        .int({ message: "Quantity must be a whole number" })
        .positive({ message: "Quantity must be greater than zero" }),

        category: z.string({
            required_error: "Product category is required",
            invalid_type_error: "Category must be a text string"
        })
        .min(3, { message: "Category name must be at least 3 characters long" })
        .max(20, { message: "Category name cannot exceed 20 characters" })
        .trim()
    })
})

type CreateProductType = z.infer<typeof CreateProductSchema>;

export {
    CreateProductSchema,
    CreateProductType
}
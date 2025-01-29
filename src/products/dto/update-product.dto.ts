import { z } from "zod";

const UpdateProductSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Product name must be a text string"
        })
        .min(3, { message: "Product name must be at least 3 characters long" })
        .trim()
        .optional(),

        price: z.number({
            invalid_type_error: "Price must be a valid number"
        })
        .positive({ message: "Price must be a positive number" })
        .gte(100, { message: "Price must be at least 100 naira" })
        .finite({ message: "Price must be a finite number" })
        .optional(),

        description: z.string({
            invalid_type_error: "Description must be a text string"
        })
        .nullish()
        .optional(),

        quantity: z.number({
            invalid_type_error: "Quantity must be a valid number"
        })
        .int({ message: "Quantity must be a whole number" })
        .positive({ message: "Quantity must be greater than zero" })
        .optional(),

        category: z.string({
            invalid_type_error: "Category must be a text string"
        })
        .min(3, { message: "Category name must be at least 3 characters long" })
        .max(20, { message: "Category name cannot exceed 20 characters" })
        .trim()
        .optional()
    }),
    params: z.object({
        id: z.string({
            required_error: "The 'id' field is required.",
            invalid_type_error: "The 'id' must be a string.",
          })
          .uuid("The provided 'id' must be a valid UUID.")
    })
});

type UpdateProductType = z.infer<typeof UpdateProductSchema>;

export {
    UpdateProductSchema,
    UpdateProductType
}
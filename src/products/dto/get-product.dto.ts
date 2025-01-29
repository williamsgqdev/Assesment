import { z } from "zod";

const GetProductSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "The 'id' field is required.",
            invalid_type_error: "The 'id' must be a string.",
          })
          .uuid("The provided 'id' must be a valid UUID.")
    })
})

type GetProductType = z.infer<typeof GetProductSchema>

export {
    GetProductSchema,
    GetProductType
}
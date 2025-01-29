import { z } from 'zod';

const GetProductsSchema = z.object({
    query: z
      .object({
        page: z
          .string()
          .pipe(
            z.coerce
              .number({
                invalid_type_error: 'Page must be a valid number',
              })
              .int('Page must be an integer')
              .min(1, 'Page must be at least 1')
          )
          .default('1'),
  
        limit: z
          .string()
          .pipe(
            z.coerce
              .number({
                invalid_type_error: 'Limit must be a valid number',
              })
              .int('Limit must be an integer')
              .min(1, 'Limit must be at least 1')
          )
          .default('10'),

        name: z.string({
          invalid_type_error: 'Name must be a string'
        }).optional(),
  
        sort_by_category: z
          .enum(['asc', 'desc'], {
            message: 'Sorting by Category must be either "asc" or "desc"',
          })
          .optional(),
        
        sort_by_name: z
          .enum(['asc', 'desc'], {
            message: 'Sorting by Name must be either "asc" or "desc" '
          })
          .optional(),

        sort_by_quantity: z
          .enum(['asc', 'desc'], {
            message: 'Sorting by Quantity must be either "asc" or "desc" '
          })
          .optional(),

        sort_by_price: z
          .enum(['asc', 'desc'], {
            message: 'Sorting by Price must be either "asc" or "desc" '
          })
          .optional(),
  
        low_price_range: z
          .string({
            required_error: 'low_price_range is required when using price filters',
            invalid_type_error: 'Price must be a string representation of a number',
          })
          .pipe(
            z.coerce
              .number({
                invalid_type_error: 'Low price must be a valid number',
              })
              .min(0, 'Low price cannot be negative')
          )
          .optional(),
  
        high_price_range: z
          .string({
            required_error: 'high_price_range is required when using price filters',
            invalid_type_error: 'Price must be a string representation of a number',
          })
          .pipe(
            z.coerce
              .number({
                invalid_type_error: 'High price must be a valid number',
              })
              .min(0, 'High price cannot be negative')
          )
          .optional(),
      })
      .refine(
        (data) =>
          (data.low_price_range === undefined && data.high_price_range === undefined) ||
          (data.low_price_range !== undefined && data.high_price_range !== undefined),
        {
          message: 'Both low_price_range and high_price_range must be provided together',
          path: ['high_price_range'],
        }
      )
      .refine(
        (data) =>
          data.low_price_range === undefined ||
          data.high_price_range === undefined ||
          data.low_price_range <= data.high_price_range,
        {
          message: 'low_price_range must be less than or equal to high_price_range',
          path: ['low_price_range'],
        }
      ),
  });
  
type GetProductsType = z.infer<typeof GetProductsSchema>;

export {
    GetProductsSchema,
    GetProductsType,
}
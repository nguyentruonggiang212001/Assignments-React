import * as z from "zod";

export const schemaProduct = z.object({
  title: z
    .string()
    .trim()
    .min(6, { message: "Tên sản phẩm tối thiểu 6 ký tự" })
    .trim(),
  price: z.number().positive(),
  description: z.string().optional(),
  thumbnail: z.any().optional(),
  brand: z.string().min(1, { message: "Brand is required" }).trim(),
  sku: z.string().min(1, { message: "SKU is required" }).trim(),
  category: z.string().nonempty({ message: "Please select a category" }),
});

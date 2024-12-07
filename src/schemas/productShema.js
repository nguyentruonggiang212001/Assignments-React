import * as z from "zod";
export const schemaProduct = z.object({
  title: z
    .string()
    .trim()
    .min(6, { message: "Tên sản phẩm tối thiểu 6 ký tự" })
    .trim(),
  description: z.string().optional(),
});

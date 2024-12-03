import * as z from "zod";
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Tên người dùng phải có ít nhất 6 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Mật khẩu không được vượt quá 255 ký tự" }),
    confirmPass: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(255, { message: "Mật khẩu không được vượt quá 255 ký tự" }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Mật khẩu không khớp",
    path: ["confirmPass"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .max(255, { message: "Mật khẩu không được vượt quá 255 ký tự" }),
});

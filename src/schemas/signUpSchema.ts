import { z } from "zod";

export const userNameValidation = z
    .string()
    .min(2, "Username must be two characters")
    .max(20, "Username must be no more then 20 characters")
    .regex(/^[a-zA-Z0-9._-]{2,20}$/, "Username must not contain special character")

export const signUpSchema = z.object({
    userName: userNameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})
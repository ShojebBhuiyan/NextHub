import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long!",
    })
    .max(50),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const KeySchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  publicKey: z.string().min(1, {
    message: "Public key is required",
  }),
});

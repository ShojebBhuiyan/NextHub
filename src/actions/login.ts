"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export async function login(
  values: z.infer<typeof LoginSchema>
): Promise<{ error?: string; success?: string }> {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid credentials!" };
  }

  return { success: "Success!" };
}

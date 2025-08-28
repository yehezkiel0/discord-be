import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6).max(100),
});

export const signInSchema = signUpSchema.pick({
  email: true,
  password: true,
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;

import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6).max(100),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

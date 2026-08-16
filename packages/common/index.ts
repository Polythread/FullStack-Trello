import { z } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const loginSchema = signupSchema.pick({
  email: true,
  password: true,
});

export const orgSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
});

export const boardSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const sectionSchema = z.object({
  title: z.string(),
});

export const issueSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type Organization = z.infer<typeof orgSchema>;
export type Board = z.infer<typeof boardSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Issue = z.infer<typeof issueSchema>;

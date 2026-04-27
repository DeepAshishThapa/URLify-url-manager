import { z } from "zod";

export const addlinkSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Enter a valid URL")
    .refine(
      (val) => val.startsWith("http://") || val.startsWith("https://"),
      {
        message: "URL must start with http:// or https://",
      }
    ),

  description: z
    .string()
    .trim()
    .optional(),

  folderId: z
    .string()
    .optional(),
});
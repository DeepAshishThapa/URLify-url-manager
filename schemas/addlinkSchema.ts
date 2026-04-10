import { z } from "zod"

export const addlinkSchema = z.object({
    url: z
        .string()
        .trim()
        .min(1, "URL is required")
        .refine(
            (val) => {
                const url = val.startsWith("http") ? val : `https://${val}`
                try {
                    new URL(url)
                    return true
                }
                catch {
                    return false
                }
            },
            { message: "Enter a valid URL" }
        ),
    description: z
        .string()
        .trim()
        .optional(),

    folderId: z
        .string()
        .optional()
})

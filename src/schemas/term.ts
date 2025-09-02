import { z } from "./zod-openapi-setup";

/**
 * FitSM Term Schema
 *
 * In the FitSM standard, vocabulary terms are defined in Chapter 6 with a specific
 * structure: each term has a number (e.g., 6.1), a name, a definition, and optional
 * notes that provide additional clarification or context.
 *
 * This schema models the exact structure used in the FitSM vocabulary.
 */

// Core Term schema based on FitSM Chapter 6 structure
export const TermSchema = z.object({
  // Sequential ID starting from 1 (e.g., 1, 2, 3...)
  id: z.number().positive("Term ID must be positive"),

  // FitSM numbering (e.g., "6.1", "6.42")
  number: z.string().regex(/^6\.\d+$/, "Term number must be in format 6.x"),

  // The term name (e.g., "Activity", "Service")
  term: z.string().min(1, "Term name is required"),

  // URL-friendly slug (e.g., "activity", "configuration-item")
  slug: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),

  // Main definition of the term
  definition: z.string().min(1, "Definition is required"),

  // Optional notes that provide additional context
  notes: z.array(z.string()).optional(),

  // Acronym expansion if the term includes acronyms in parentheses
  acronym_expansion: z.string().optional(),
});

// Export TypeScript type derived from our Zod schema
export type Term = z.infer<typeof TermSchema>;

// Validation helper
export const validateTerm = (
  data: unknown,
): { success: boolean; data?: Term; error?: string } => {
  try {
    const validData = TermSchema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
      };
    }
    return { success: false, error: "Unknown validation error" };
  }
};

// Helper function to generate URL-friendly slug from term name
export const generateSlug = (termName: string): string => {
  return termName
    .toLowerCase()
    .replace(/[()]/g, "") // Remove parentheses
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, "") // Remove any other special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
};

// Helper function to extract acronym from term name if present
export const extractAcronym = (termName: string): string | undefined => {
  const match = termName.match(/\(([A-Z]+)\)/);
  return match ? match[1] : undefined;
};

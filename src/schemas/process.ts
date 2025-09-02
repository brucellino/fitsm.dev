import { z } from "./zod-openapi-setup";

/**
 * FitSM Process Schema
 *
 * In the FitSM standard, a Process is defined as a set of interrelated
 * or interacting activities that transforms inputs into outputs to
 * achieve a specific objective within IT Service Management.
 *
 * This schema models the standard definition, not any particular implementation.
 */

// Process types as defined in the FitSM standard
export const ProcessTypeSchema = z.enum([
  "strategic", // High-level processes that set direction
  "tactical", // Mid-level processes that plan and coordinate
  "operational", // Day-to-day processes that deliver services
]);

// Core Process schema based on FitSM standard
export const ProcessSchema = z.object({
  // Unique identifier within the standard
  id: z.string().min(1, "Process ID is required"),

  // Standard process name
  name: z.string().min(1, "Process name is required"),

  // Purpose and scope as defined in the standard
  description: z.string().optional(),

  // Classification within the FitSM framework
  type: ProcessTypeSchema,

  // Key inputs that this process transforms
  inputs: z.array(z.string()).optional(),

  // Key outputs that this process produces
  outputs: z.array(z.string()).optional(),

  // Primary objective this process aims to achieve
  objective: z.string().optional(),
});

// Export TypeScript types derived from our Zod schemas
export type ProcessType = z.infer<typeof ProcessTypeSchema>;
export type Process = z.infer<typeof ProcessSchema>;

// Validation helper
export const validateProcess = (
  data: unknown,
): { success: boolean; data?: Process; error?: string } => {
  try {
    const validData = ProcessSchema.parse(data);
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

import { STATIC_STATES } from "@/features/multistep-form/services/form.api";
import { z } from "zod";

export const accountSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const locationSchema = z
  .object({
    address: z.string().min(5, "Address must be at least 5 characters"),
    zipCode: z
      .string()
      .min(1, "ZIP code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    timezone: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    city: z.string().min(1, "City is required"),
  })
  .refine(
    (data) => {
      const USStates = STATIC_STATES.US;
      const CAStates = STATIC_STATES.CA;

      const isValidState = (state: string) => {
        if (data.country === "US") {
          return USStates.find((e) => e.name === state);
        }
        if (data.country === "CA") {
          return CAStates.find((e) => e.name === state);
        }
        return true;
      };

      if (data.country === "US" || data.country === "CA") {
        return (
          data.state && data.state.trim() !== "" && isValidState(data.state)
        );
      }
      return true;
    },
    {
      message: "Please select a valid state/province",
      path: ["state"],
    }
  );

export const formSchema = z.object({
  account: accountSchema,
  location: locationSchema,
});

export type AccountFormData = z.infer<typeof accountSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type CompleteFormData = z.infer<typeof formSchema>;

// Individual step validation
export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1:
      return accountSchema.safeParse(data);
    case 2:
      return locationSchema.safeParse(data);
    case 3:
      return formSchema.safeParse(data);
    default:
      return {
        success: false,
        error: { issues: [{ message: "Invalid step" }] },
      };
  }
};

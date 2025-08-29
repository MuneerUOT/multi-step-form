import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormState, FormData } from "../types/form.types";

interface ExtendedFormState extends FormState {
  finishedStep: number;
  isCompleted: boolean;
}

interface FormActions {
  setCurrentStep: (step: number) => void;

  nextStep: (stepData?: any) => boolean;
  previousStep: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  resetForm: () => void;
  goToHome: () => void;
  submitForm: () => Promise<{
    data: Partial<FormData> | null;
    success: boolean;
    errors: Record<string, string> | null;
    message: string;
  }>;
}

const initialState: ExtendedFormState = {
  currentStep: 1,
  finishedStep: 0,
  isCompleted: false,
  formData: {},
  steps: [
    {
      id: 1,
      title: "Account Information",
      description: "Create your account credentials",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Location Details",
      description: "Tell us where you are located",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Review & Confirm",
      description: "Review your information before submitting",
      isCompleted: false,
    },
  ],
  isSubmitting: false,
  errors: {},
};

export const useFormStore = create<ExtendedFormState & FormActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step: number) => {
        set({ currentStep: step });
      },

      nextStep: (stepData?: any) => {
        const { currentStep } = get();

        // If stepData is provided, update the form data for the current step
        if (stepData) {
          let stepKey: keyof FormData;

          switch (currentStep) {
            case 1:
              stepKey = "account";
              break;
            case 2:
              stepKey = "location";
              break;
            default:
              return false;
          }

          // Update form data
          set((state: ExtendedFormState & FormActions) => ({
            formData: {
              ...state.formData,
              [stepKey]: {
                ...state.formData[stepKey],
                ...stepData,
              },
            },
          }));
        }

        // Mark current step as completed and move to next step
        set((state: ExtendedFormState & FormActions) => ({
          finishedStep: Math.max(state.finishedStep, currentStep),
          steps: state.steps.map((step) =>
            step.id === currentStep ? { ...step, isCompleted: true } : step
          ),
          currentStep: currentStep < 3 ? currentStep + 1 : currentStep,
        }));

        return true;
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      setSubmitting: (isSubmitting) => {
        set({ isSubmitting });
      },

      setErrors: (errors) => {
        set({ errors });
      },

      clearErrors: () => {
        set({ errors: {} });
      },

      resetForm: () => {
        set(initialState);
      },

      goToHome: () => {
        set(initialState);
      },

      submitForm: async () => {
        const { setSubmitting, formData } = get();

        setSubmitting(true);

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));

          set({ isCompleted: true, finishedStep: 3 });

          return Promise.resolve({
            data: formData,
            success: true,
            message: "Form submitted successfully!",
            errors: null,
          });
        } catch (error) {
          console.error("Form submission failed:", error);
          set({
            errors: { submit: "Failed to submit form. Please try again." },
          });

          return Promise.resolve({
            data: null,
            success: false,
            message: "Form submission failed.",
            errors: get().errors,
          });
        } finally {
          setSubmitting(false);
        }
      },
    }),
    {
      name: "multistep-form-store",
    }
  )
);

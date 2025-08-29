import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
} from "@/components/ui/stepper";
import { useFormStore } from "@/features/multistep-form";
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/(multi-step-from)")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { currentStep, steps, errors, finishedStep } = useFormStore();

  const {
    location: { pathname },
  } = useRouterState();

  const currentStepPath = Number(pathname.split("step")[1]);

  // Allow access to completed steps (finishedStep) and the next available step (finishedStep + 1)
  // Prevent access to steps beyond what has been completed
  if (currentStepPath && currentStepPath > finishedStep + 1) {
    navigate({
      to: `/step${Math.min(finishedStep + 1, steps.length)}`,
    });

    toast.error("Please complete the previous steps first.");
    return null;
  }

  return (
    <div className="mx-auto px-4 py-8 max-w-lg">
      <div className="space-y-8">
        <h1 className="font-bold text-2xl md:text-4xl text-center">
          Create Your{" "}
          <span className="bg-primary px-2 text-primary-foreground">
            Account
          </span>
        </h1>

        <p className="text-muted-foreground text-center">
          Complete your registration in just a few simple steps
        </p>

        <Stepper value={currentStep}>
          {steps.map((step) => (
            <StepperItem
              key={step.id}
              step={step.id}
              className="not-last:flex-1"
            >
              <StepperIndicator />

              {step.id < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>

        <div>
          <h2 className="text-primary">
            Step {currentStep}/{steps.length}
          </h2>

          <h2 className="font-bold text-lg">{steps[currentStep - 1].title}</h2>
          <p className="text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
          <div className="pt-5">
            {Object.keys(errors).length > 0 && (
              <div className="bg-red-50 mb-4 p-3 border border-red-200 rounded-md">
                <h4 className="mb-2 font-medium text-red-800">
                  Please fix the following errors:
                </h4>
                <ul className="space-y-1 text-red-600 text-sm">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>
                      • {field}: {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

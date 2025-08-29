import { createFileRoute } from "@tanstack/react-router";
import { StepSuccess } from "@/features/multistep-form";

export const Route = createFileRoute("/(multi-step-from)/step4")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto px-4 py-8 container">
      <StepSuccess autoRedirectDelay={5} />
    </div>
  );
}

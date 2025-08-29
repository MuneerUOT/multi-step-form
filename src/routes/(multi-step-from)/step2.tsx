import { StepLocation } from "@/features/multistep-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(multi-step-from)/step2")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StepLocation />;
}

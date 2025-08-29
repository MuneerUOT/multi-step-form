import { StepAccount } from "@/features/multistep-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(multi-step-from)/step1")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StepAccount />;
}

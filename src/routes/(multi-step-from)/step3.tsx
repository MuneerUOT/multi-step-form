import { StepConfirm } from "@/features/multistep-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(multi-step-from)/step3")({
  component: RouteComponent,
});

function RouteComponent() {
  return <StepConfirm />;
}

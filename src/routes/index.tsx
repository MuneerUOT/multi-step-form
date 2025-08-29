import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1 className="font-bold text-primary text-4xl">Multi Step Form</h1>
      <Link to="/step1">
        <Button>Start Registration</Button>
      </Link>
    </div>
  );
}

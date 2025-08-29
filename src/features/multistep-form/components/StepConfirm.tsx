import { useFormStore } from "../store/form.store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useCountries,
  useStates,
} from "@/features/multistep-form/services/form.api";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle, Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function StepConfirm() {
  const navigate = useNavigate();
  const {
    formData,
    previousStep,
    setCurrentStep,
    isSubmitting,
    submitForm,
    steps,
  } = useFormStore();

  const { data: countries, isLoading: isLoadingCountries } = useCountries();
  const { data: states, isLoading: isLoadingStates } = useStates(
    formData.location?.country || ""
  );

  const { account, location } = formData;

  const handleSubmit = async () => {
    try {
      const result = await submitForm();
      if (result.success) {
        toast.success(result?.message);
        navigate({
          to: "/step4",
        });
      } else {
        toast.error(result?.message || "Form submission failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  if (!account || !location) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            Please complete all previous steps to review your information.
          </p>
          <Link to="/step1" className="mt-4 w-full">
            <Button onClick={() => setCurrentStep(1)} className="w-full">
              Go to Step 1
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isFormComplete = steps[0].isCompleted && steps[1].isCompleted;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Review & Confirm
        </CardTitle>
        <CardDescription>
          Please review your information before submitting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Account Information Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Account Information</h3>
            <Link to="/step1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(1)}
                className="px-2 h-8"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{account.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Username:</span>
              <span>{account.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Password:</span>
              <span>{"•".repeat(account.password.length)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Location Information Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Location Information</h3>
            <Link to="/step2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(2)}
                className="px-2 h-8"
              >
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Country:</span>
              <span>
                {isLoadingCountries
                  ? "Loading..."
                  : countries?.find((c) => c.code === location.country)?.name}
              </span>
            </div>
            {location.state && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">State/Province:</span>
                <span>
                  {isLoadingStates
                    ? "Loading..."
                    : states?.find((s) => s.name === location.state)?.name}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">City:</span>
              <span>{location.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address:</span>
              <span>{location.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ZIP Code:</span>
              <span>{location.zipCode}</span>
            </div>
            {location.timezone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timezone:</span>
                <span>{location.timezone}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Submit Section */}
        <div className="space-y-4">
          {!isFormComplete && (
            <div className="bg-yellow-50 p-3 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">
                Please complete all steps before submitting the form.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Link to="/step2">
              <Button type="button" variant="outline" onClick={previousStep}>
                Back
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!isFormComplete || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Form"
              )}
            </Button>
          </div>

          {isFormComplete && (
            <p className="text-muted-foreground text-xs text-center">
              By submitting this form, you agree to our terms and conditions.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useSuccessRedirect } from "../hooks/useSuccessRedirect";

interface StepSuccessProps {
  autoRedirectDelay?: number;
}

export function StepSuccess({ autoRedirectDelay = 5 }: StepSuccessProps) {
  const { handleGoHome } = useSuccessRedirect();
  const [countdown, setCountdown] = useState(autoRedirectDelay);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleGoHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [handleGoHome]);

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-6">
          <div className="flex justify-center items-center bg-green-100 mx-auto mb-4 rounded-full w-16 h-16">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="font-bold text-green-700 text-2xl">
            Registration Successful!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your account has been created successfully. Welcome aboard!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {countdown > 0 ? (
            <div className="p-4 rounded-lg">
              <p className="mb-2 text-muted-foreground text-sm">
                Redirecting to home page in:
              </p>
              <div className="font-bold text-primary text-3xl">{countdown}</div>
              <p className="mt-1 text-muted-foreground text-xs">seconds</p>
            </div>
          ) : (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-600 text-sm">
                Auto-redirect cancelled. You can stay here or go home manually.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button onClick={handleGoHome} className="w-full">
              Go to Home Page Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

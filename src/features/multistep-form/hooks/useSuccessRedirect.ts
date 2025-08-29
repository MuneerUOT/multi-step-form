import { useEffect } from "react";
import { useFormStore } from "../store/form.store";
import { useNavigate } from "@tanstack/react-router";

export function useSuccessRedirect() {
  const { isCompleted, goToHome } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCompleted) {
      // If not completed, redirect to home
      navigate({ to: "/" });
      return;
    }
  }, [isCompleted, navigate]);

  const handleGoHome = () => {
    goToHome();
    navigate({ to: "/" });
  };

  return {
    handleGoHome,
    isCompleted,
  };
}

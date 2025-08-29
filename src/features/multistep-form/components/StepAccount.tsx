import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, type AccountFormData } from "../schemas/form.schemas";
import { useFormStore } from "../store/form.store";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InputControlled,
  PasswordControlled,
} from "@/components/form/controlled-inputs";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function StepAccount() {
  const navigate = useNavigate();
  const { formData, nextStep } = useFormStore();

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: formData.account || {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: AccountFormData) => {
    const success = nextStep(data);
    if (success) {
      navigate({
        to: "/step2",
      });
    }
  };

  const isValid = form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputControlled
          name="email"
          label="Enter your email"
          inputProps={{
            placeholder: "Enter your email",
          }}
        />

        <InputControlled
          name="username"
          label="Choose a username"
          inputProps={{
            placeholder: "Choose a username",
          }}
        />

        <PasswordControlled
          name="password"
          label="Create a password"
          inputProps={{
            placeholder: "Create a password",
            type: "password",
          }}
        />

        <PasswordControlled
          name="confirmPassword"
          label="Confirm your password"
          inputProps={{
            placeholder: "Confirm your password",
            type: "password",
          }}
        />
        <div className="flex gap-2">
          <Link to="/">
            <Button type="button" variant="outline">
              <ArrowLeft /> Cancel
            </Button>
          </Link>
          <Button type="submit" className="flex-1" disabled={!isValid}>
            Continue to Location
          </Button>
        </div>
      </form>
    </Form>
  );
}

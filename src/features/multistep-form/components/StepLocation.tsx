import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationSchema, type LocationFormData } from "../schemas/form.schemas";
import { useFormStore } from "../store/form.store";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  InputControlled,
  SelectControlled,
} from "@/components/form/controlled-inputs";
import {
  fetchStates,
  useCountries,
  useStates,
} from "@/features/multistep-form/services/form.api";
import { Link, useNavigate } from "@tanstack/react-router";
import AdvancedSelector from "@/components/ui/advanced-selector";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";

export function StepLocation() {
  const navigate = useNavigate();
  const { formData, nextStep, previousStep } = useFormStore();

  const form = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: formData.location || {
      country: "US",
      state: "",
      city: "",
      address: "",
      zipCode: "",
      timezone: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: LocationFormData) => {
    const success = nextStep(data);
    if (success) {
      navigate({
        to: "/step3",
      });
    }
  };

  const isCanada = form.watch("country") === "CA";

  // Check if country requires state selection
  const isStateRequired = form.watch("country") === "US" || isCanada;

  const { data: countries } = useCountries();
  const { data: states } = useStates(form.watch("country"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <SelectControlled
          name="country"
          label="Country"
          inputProps={{
            options:
              countries?.map((country) => ({
                value: country.code,
                label: country.name,
              })) ?? [],
          }}
        />

        {/* Conditional State/Province field */}
        {isStateRequired && (
          <div className="space-y-1">
            <Label htmlFor="state">State/Province</Label>
            <AdvancedSelector
              defaultOptions={states?.map((state) => ({
                label: state.name,
                value: state.code,
              }))}
              value={
                form.watch("state")
                  ? {
                      label: form.watch("state")!,
                      value: form.watch("state")!,
                    }
                  : undefined
              }
              loadingIndicator={<Loader className="m-2 mx-auto animate-spin" />}
              onSearch={async (value) => {
                const res = await fetchStates(form.watch("country"), value);

                return res.map((state) => ({
                  label: state.name,
                  value: state.code,
                }));
              }}
              triggerSearchOnFocus
              onChange={(value) => {
                if (Array.isArray(value)) return;

                form.setValue("state", value.label);
              }}
              placeholder="Select frameworks you like..."
              emptyIndicator={
                <p className="text-lg text-center leading-10">
                  no results found.
                </p>
              }
            />
            <p>
              {form.formState.errors.state && (
                <span className="text-red-500">
                  {form.formState.errors.state.message}
                </span>
              )}
            </p>
          </div>
        )}

        <InputControlled
          name="city"
          label="City"
          inputProps={{
            placeholder: "Enter your city",
          }}
        />

        <InputControlled
          name="address"
          label="Address"
          inputProps={{
            placeholder: "Enter your full address",
          }}
        />

        <InputControlled
          name="zipCode"
          label="ZIP Code"
          inputProps={{
            placeholder: "Enter your ZIP code",
          }}
        />

        {/* Optional timezone field for certain countries */}
        {isStateRequired && (
          <SelectControlled
            name="timezone"
            label="Timezone"
            inputProps={{
              placeholder: "Select your timezone",
              options: [
                { value: "EST", label: "Eastern Time (EST)" },
                { value: "CST", label: "Central Time (CST)" },
                { value: "MST", label: "Mountain Time (MST)" },
                { value: "PST", label: "Pacific Time (PST)" },
                ...(isCanada
                  ? [
                      { value: "AST", label: "Atlantic Time (AST)" },
                      { value: "NST", label: "Newfoundland Time (NST)" },
                    ]
                  : []),
              ],
            }}
          />
        )}

        <div className="flex gap-2">
          <Link to="/step1" className="flex-1">
            <Button
              type="button"
              variant="outline"
              onClick={previousStep}
              className="w-full"
            >
              Back
            </Button>
          </Link>

          <Button type="submit" className="flex-1">
            Continue to Review
          </Button>
        </div>
      </form>
    </Form>
  );
}

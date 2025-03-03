"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ReviewStep } from "@/app/business-clinic/components/forms/issue-without-business-form/steps/two";
import { StepOne } from "@/app/business-clinic/components/forms/issue-without-business-form/steps/one";
import { YesNoSelect } from "@/app/business-clinic/components/forms/common/yes-no-select";
import { formSchema } from "@/app/business-clinic/schemas/issues-without-business";
import { toast } from "sonner";

YesNoSelect.displayName = "YesNoSelect";

const steps = [
  { id: 1, title: "Issue Details" },
  { id: 2, title: "Review & Submit" },
];

export default function RegisterIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      nature_of_issue: "",
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values changed:", value);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = React.useCallback(
    async (values: z.infer<typeof formSchema>) => {
      console.log("Form submitted with values:", values);
      if (isSubmitting) return;

      setIsSubmitting(true);
      try {
        toast.loading("Submitting...", {
          description: "Please wait while we submit your issue.",
        });

        const formData = new FormData();

        // Add all the form fields to FormData
        Object.entries(values).forEach(([key, value]) => {
          if (key === "issue_image" && value instanceof File) {
            formData.append("issue_image", value);
          } else if (typeof value !== "undefined" && value !== null) {
            formData.append(key, value.toString());
          }
        });

        const response = await fetch(
          `https://cim.baliyoventures.com/api/business_clinic/issues/`,
          {
            method: "POST",
            body: formData,
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          console.error("API Error Response:", responseData); // For debugging
          throw new Error(
            responseData.detail ||
              Object.entries(responseData)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")
          );
        }

        // Show success toast
        toast.success("Success!", {
          description: "Your issue has been successfully registered.",
        });
        setIsSubmitting(false);

        router.push(`/business-clinic/thank-you?id=${responseData.id}`);
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Error", {
          description:
            error instanceof Error ? error.message : "Failed to submit issue",
        });
        setIsSubmitting(false);
      }
    },
    [isSubmitting, toast, router]
  );

  const nextStep = async () => {
    const fieldsToValidate =
      {
        1: [
          "title",
          "description",
          "nature_of_issue",
          "industry_specific_or_common_issue",
          "policy_related_or_procedural_issue",
        ],
      }[currentStep] || [];

    const isStepValid = await form.trigger(
      fieldsToValidate as Array<keyof typeof form.getValues>
    );

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    } else {
      // Show error toast if validation fails
      toast.error("Validation Error", {
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <StepOne form={form} />;
      case 2:
        return <ReviewStep formData={form.getValues()} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center flex-1 ${
                    currentStep >= step.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`
                    w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base
                    ${
                      currentStep >= step.id
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }
                  `}
                  >
                    {step.id}
                  </div>
                  <span className="ml-2 text-xs sm:text-sm md:text-base hidden sm:inline">
                    {step.title}
                  </span>
                  {step.id < steps.length && (
                    <div className="w-8 sm:w-12 h-[2px] mx-2 bg-muted flex-grow" />
                  )}
                </div>
              ))}
            </div>
            <Progress
              value={(currentStep / steps.length) * 100}
              className="h-1 sm:h-2"
            />
          </div>

          <Card className="p-4 sm:p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 sm:space-y-8"
              >
                {renderStepContent()}

                <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={previousStep}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      Previous
                    </Button>
                  )}

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                      }}
                      className="w-full sm:w-auto order-1 sm:order-2"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Submitting...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Submit Issue"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

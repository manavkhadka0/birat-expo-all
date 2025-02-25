"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { mdmuFormSchema, stepValidationSchemas } from "./schemas";
import { validateStepData } from "./utils";
import { API_ENDPOINTS } from "./constants";
import { FormProgress } from "./components/FormProgress";
import { CompanyInformation } from "./steps/CompanyInformation";
import { ContactDetails } from "./steps/ContactDetails";
import { BusinessDetails } from "./steps/BusinessDetails";
import { AdditionalInformation } from "./steps/AdditionalInformation";
import { Review } from "./steps/Review";

import type {
  IndustryCategory,
  IndustrySubCategory,
  MDMUFormData,
} from "./types";

export function MDMUForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<MDMUFormData>({
    resolver: zodResolver(mdmuFormSchema),
    defaultValues: {
      // Company Information
      name_of_company: "",
      address_province: "",
      address_district: "",
      address_municipality: "",
      address_ward: "",
      address_street: "",

      // Contact Information
      contact_name: "",
      contact_number: "",
      contact_designation: "",
      contact_alternate_number: "",
      contact_email: "",

      // Business Details
      nature_of_industry_category: {} as IndustryCategory,
      nature_of_industry_sub_category: {} as IndustrySubCategory,
      product_market: "Domestic",
      raw_material: "Local",
      industry_size: "Startup",

      // Additional Information
      member_of_cim: "false",
      know_about_mdmu: "false",
      already_used_logo: undefined,
      interested_in_logo: undefined,
      self_declaration: false,
    },
    mode: "onChange",
  });

  const handleNextStep = async () => {
    if (currentStep === 5) return; // Don't validate on review step

    const currentStepSchema =
      stepValidationSchemas[currentStep as keyof typeof stepValidationSchemas];
    const currentStepFields = Object.keys(currentStepSchema.shape);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasErrors = await form.trigger(currentStepFields as any);
    if (!hasErrors) return;

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: MDMUFormData) => {
    try {
      setIsLoading(true);

      // Transform data for backend
      const submitData: Omit<
        MDMUFormData,
        "nature_of_industry_category" | "nature_of_industry_sub_category"
      > & {
        nature_of_industry_category: number;
        nature_of_industry_sub_category: number;
        industry_size: string;
      } = {
        ...data,
        nature_of_industry_category: data.nature_of_industry_category.id,
        nature_of_industry_sub_category:
          data.nature_of_industry_sub_category?.id || 0,
        industry_size: data.industry_size,
        self_declaration: data.self_declaration || false,
      };

      // Validate final step before submission
      const finalStepValidation = await validateStepData(5, submitData);
      if (!finalStepValidation.success) return;

      // Submit form data
      const response = await axios.post(API_ENDPOINTS.register, submitData);

      if (response.status === 201) {
        // Get message and file_url from response
        const { message, file_url } = response.data;

        // Construct the URL with parameters
        const searchParams = new URLSearchParams({
          message:
            message ||
            "Thank you for your application. We will review your submission and get back to you soon.",
          fileUrl: file_url || "",
        });

        // Reset form and redirect to thank you page
        form.reset();
        router.push(`/thank-you?${searchParams.toString()}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while submitting the form";
        form.setError("root", {
          type: "manual",
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <FormProgress currentStep={currentStep} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && <CompanyInformation form={form} />}
          {currentStep === 2 && <ContactDetails form={form} />}
          {currentStep === 3 && <BusinessDetails form={form} />}
          {currentStep === 4 && <AdditionalInformation form={form} />}
          {currentStep === 5 && <Review form={form} isSubmitting={isLoading} />}

          {/* Form Error Message */}
          {form.formState.errors.root && (
            <div className="text-sm text-red-600 mt-4">
              {form.formState.errors.root.message}
            </div>
          )}

          {/* Only show navigation buttons if not on review step */}
          {currentStep !== 5 && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="w-full sm:w-auto hover:bg-gray-100 "
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}

              <Button
                type={currentStep === 5 ? "submit" : "button"}
                className={`w-full sm:w-auto bg-[#0A1E4B] hover:bg-blue-900 ${
                  currentStep === 1 ? "sm:ml-auto" : ""
                }`}
                disabled={isLoading}
                onClick={currentStep === 5 ? undefined : handleNextStep}
              >
                {currentStep === 5 ? (
                  isLoading ? (
                    "Submitting..."
                  ) : (
                    "Submit Application"
                  )
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createWishOfferSchema } from "@/app/b2b/types/schemas/create-wish-schemas";
import type {
  CreateWishFormValues,
  ImageUpload,
  HSCode,
  Service,
} from "@/app/b2b/types/create-wish-type";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Event } from "@/app/b2b/types/events";
import { useDebouncedCallback } from "use-debounce";
import { StepIndicator } from "./create-wish-steps/step-indicator";
import { Step1Type } from "./create-wish-steps/step-1-type";
import { Step2Details } from "./create-wish-steps/step-2-details";
import { Step3Company } from "./create-wish-steps/step-3-company";
import { Step4Personal } from "./create-wish-steps/step-4-personal";
import { Step5Review } from "./create-wish-steps/step-5-review";

interface CreateWishFormProps {
  event?: Event;
  onClose?: () => void;
  is_wish_or_offer: "wishes" | "offers";
}

export function CreateWishOfferForm({
  event,
  onClose,
  is_wish_or_offer,
}: CreateWishFormProps) {
  const [image, setImage] = useState<ImageUpload | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STEPS = [
    {
      title: "Type",
      description: `Choose ${
        is_wish_or_offer === "wishes" ? "wish" : "offer"
      } type`,
    },
    {
      title: "Details",
      description: "Product/Service details",
    },
    {
      title: "Company",
      description: "Company information",
    },
    {
      title: "Personal",
      description: "Personal details",
    },
    {
      title: "Review",
      description: "Review and submit",
    },
  ];

  const [designationPopoverOpen, setDesignationPopoverOpen] = useState(false);
  const [productSearchOpen, setProductSearchOpen] = useState(false);
  const [productSearchValue, setProductSearchValue] = useState("");
  const [products, setProducts] = useState<HSCode[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<HSCode | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceSearchOpen, setServiceSearchOpen] = useState(false);
  const [serviceSearchValue, setServiceSearchValue] = useState("");
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<CreateWishFormValues>({
    resolver: zodResolver(createWishOfferSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      title: "",
      full_name: "",
      designation: "",
      email: "",
      mobile_no: "",
      alternate_no: "",
      company_name: "",
      company_website: "",
      product: "",
      service: "",
      images: [],
      address: "",
      province: "",
      municipality: "",
      ward: "",
      type: "Product",
      event_id: event?.id?.toString() || "",
    },
  });

  const searchProducts = useDebouncedCallback(async (search: string) => {
    if (search.length < 3) return;

    setIsLoadingProducts(true);
    try {
      const response = await fetch(
        `https://cim.baliyoventures.com/api/wish_and_offers/hs-codes/?search=${search}`
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.results || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, 300);

  useEffect(() => {
    if (productSearchValue.length < 3) {
      setProducts([]);
    } else {
      searchProducts(productSearchValue);
    }
  }, [productSearchValue, searchProducts]);

  const getFieldsForStep = (step: number): (keyof CreateWishFormValues)[] => {
    switch (step) {
      case 1:
        return ["title", "type"];
      case 2: {
        const wishType = form.getValues("type");
        if (!wishType) return [];
        return wishType === "Product" ? ["product"] : ["service"];
      }
      case 3:
        return ["company_name", "address", "province", "municipality", "ward"];
      case 4:
        return ["full_name", "designation", "email", "mobile_no"];
      default:
        return [
          "title",
          "type",
          "product",
          "service",
          "company_name",
          "address",
          "province",
          "municipality",
          "ward",
          "full_name",
          "designation",
          "email",
          "mobile_no",
        ];
    }
  };

  const nextStep = async () => {
    const currentFields = getFieldsForStep(currentStep);

    if (currentStep === 2) {
      const wishType = form.getValues("type");
      const fieldToCheck = wishType === "Product" ? "product" : "service";
      const value = form.getValues(fieldToCheck);

      if (!value) {
        toast.error(`Please select a ${wishType.toLowerCase()}`);
        return;
      }
    }

    const isValid = await form.trigger(currentFields, {
      shouldFocus: true,
    });

    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const onSubmit = async (data: CreateWishFormValues) => {
    if (currentStep !== STEPS.length) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append non-file fields
      Object.entries(data).forEach(([key, value]) => {
        if (value && key !== "images") {
          formData.append(key, value.toString());
        }
      });

      // Append single image if it exists
      if (image) {
        formData.append("image", image.file);
      }

      const response = await fetch(
        `https://cim.baliyoventures.com/api/wish_and_offers/${is_wish_or_offer}/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to create wish");

      toast.success("Wish created successfully!");
      form.reset();
      setImage(null);
      onClose?.();
    } catch (error) {
      console.error("Failed to create wish:", error);
      toast.error("Failed to create wish");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoadingServices(true);
      try {
        const response = await fetch(
          `https://cim.baliyoventures.com/api/wish_and_offers/services/`
        );
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data.results);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        toast.error("Failed to fetch services");
      } finally {
        setIsLoadingServices(false);
      }
    };

    if (form.watch("type") === "Service") {
      fetchServices();
    }
  }, [form.watch("type")]);

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Type form={form} is_wish_or_offer={is_wish_or_offer} />;
      case 2:
        return (
          <Step2Details
            form={form}
            products={products}
            services={services}
            isLoadingProducts={isLoadingProducts}
            isLoadingServices={isLoadingServices}
            selectedProduct={selectedProduct}
            selectedService={selectedService}
            productSearchOpen={productSearchOpen}
            serviceSearchOpen={serviceSearchOpen}
            productSearchValue={productSearchValue}
            serviceSearchValue={serviceSearchValue}
            showServiceForm={showServiceForm}
            setProductSearchOpen={setProductSearchOpen}
            setServiceSearchOpen={setServiceSearchOpen}
            setProductSearchValue={setProductSearchValue}
            setServiceSearchValue={setServiceSearchValue}
            setShowServiceForm={setShowServiceForm}
            setSelectedProduct={setSelectedProduct}
            setSelectedService={setSelectedService}
            setServices={setServices}
            image={image}
            setImage={setImage}
          />
        );
      case 3:
        return <Step3Company form={form} />;
      case 4:
        return (
          <Step4Personal
            form={form}
            designationPopoverOpen={designationPopoverOpen}
            setDesignationPopoverOpen={setDesignationPopoverOpen}
          />
        );
      case 5:
        return (
          <Step5Review
            form={form}
            selectedProduct={selectedProduct}
            selectedService={selectedService}
            image={image}
          />
        );
      default:
        return null;
    }
  };

  const isStepCompleted = (stepIndex: number) => {
    const fields = getFieldsForStep(stepIndex);
    return fields.every((field) => !!form.getValues(field));
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep || isStepCompleted(stepIndex)) {
      setCurrentStep(stepIndex);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {event && (
          <h1 className="text-2xl font-bold mb-4 px-4 md:px-0">
            Create {is_wish_or_offer === "wishes" ? "Wish" : "Offer"} for{" "}
            {event.title}
          </h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
          {/* Left side - Steps */}
          <div className="col-span-1 md:col-span-4 shrink-0">
            <StepIndicator
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={(step) => handleStepClick(step)}
            />
          </div>

          {/* Right side - Form content */}
          <div className="col-span-1 md:col-span-8">
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border mx-4 md:mx-0">
              <div className="min-h-[400px]">{renderStep()}</div>

              <div className="flex justify-between mt-8 gap-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    onClick={prevStep}
                  >
                    Previous
                  </Button>
                )}

                <Button
                  type="button"
                  className="bg-blue-500 ml-auto hover:bg-blue-600"
                  onClick={async () => {
                    if (currentStep === STEPS.length) {
                      form.handleSubmit(onSubmit)();
                    } else {
                      await nextStep();
                    }
                  }}
                  disabled={isSubmitting}
                >
                  {currentStep === STEPS.length
                    ? isSubmitting
                      ? "Creating..."
                      : "Create Wish"
                    : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

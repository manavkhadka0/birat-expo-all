import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MDMUFormData, IndustrySize } from "../types";

interface ReviewProps {
  form: UseFormReturn<MDMUFormData & { industry_size: IndustrySize }>;
  isSubmitting?: boolean;
}

type ReviewSection = {
  title: string;
  data: Array<{
    label: string;
    value: string | number | boolean | undefined;
    transform?: (value: any) => string;
  }>;
};

const formatBoolean = (value: "true" | "false" | undefined) =>
  value === "true" ? "Yes" : "No";

export function Review({ form, isSubmitting }: ReviewProps) {
  const formData = form.getValues();

  const sections: ReviewSection[] = [
    {
      title: "Company Information",
      data: [
        { label: "Company Name", value: formData.name_of_company },
        { label: "Province", value: formData.address_province },
        { label: "District", value: formData.address_district },
        { label: "Municipality", value: formData.address_municipality },
        { label: "Ward", value: formData.address_ward },
        { label: "Street Address", value: formData.address_street },
      ],
    },
    {
      title: "Contact Information",
      data: [
        { label: "Contact Person", value: formData.contact_name },
        { label: "Contact Number", value: formData.contact_number },
        { label: "Designation", value: formData.contact_designation },
        {
          label: "Alternate Number",
          value: formData.contact_alternate_number,
        },
        { label: "Email", value: formData.contact_email },
      ],
    },
    {
      title: "Business Details",
      data: [
        {
          label: "Industry Category",
          value: formData.nature_of_industry_category?.name,
        },
        {
          label: "Sub Category",
          value: formData.nature_of_industry_sub_category?.name,
        },
        { label: "Product Market", value: formData.product_market },
        { label: "Raw Material", value: formData.raw_material },
        { label: "Industry Size", value: formData.industry_size },
      ],
    },
    {
      title: "Additional Information",
      data: [
        {
          label: "Member of CIM",
          value: formData.member_of_cim,
          transform: formatBoolean,
        },
        {
          label: "Know About MDMU",
          value: formData.know_about_mdmu,
          transform: formatBoolean,
        },
        {
          label: "Already Used Logo",
          value: formData.already_used_logo,
          transform: formatBoolean,
        },
        {
          label: "Interested in Logo",
          value: formData.interested_in_logo,
          transform: formatBoolean,
        },
        {
          label: "Self Declaration",
          value: formData.self_declaration,
          transform: (value: boolean) => (value ? "Yes" : "No"),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Review Your Application
        </h2>
        <p className="text-sm text-gray-500">
          Please review your information carefully before submitting the
          application.
        </p>
      </div>

      {sections.map((section, index) => (
        <Card key={index} className="border-gray-100">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {section.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {section.data.map((item) => (
                <div key={item.label} className="space-y-1">
                  <label className="text-sm font-medium text-gray-500">
                    {item.label}
                  </label>
                  <p className="text-sm text-gray-900">
                    {item.transform
                      ? item.transform(item.value)
                      : item.value || "-"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </div>
  );
}

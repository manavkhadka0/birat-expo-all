import { ReviewSection } from "../review-components/ReviewSection";
import { ReviewItem } from "../review-components/ReviewItem";
import { IssueWithBusinessSchema } from "@/app/business-clinic/schemas/issues-with-business";

export const ReviewStep = ({
  formData,
}: {
  formData: IssueWithBusinessSchema;
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Information</h3>
      <div className="grid gap-6">
        <ReviewSection title="Issue Details">
          <ReviewItem label="Title" value={formData.title} />
          <ReviewItem
            label="Descriptsion"
            value={formData.description}
            customClass="description-box" // Add custom class for styling
            isHtml={true} // Render description as HTML
          />
          <ReviewItem
            label="Attached File"
            value={
              formData.issue_image instanceof File
                ? formData.issue_image.name
                : "No file attached"
            }
          />
          <ReviewItem
            label="Nature of Issue"
            value={formData.nature_of_issue}
          />
        </ReviewSection>

        <ReviewSection title="Industry Information">
          <ReviewItem label="Industry Size" value={formData.industry_size} />
          <ReviewItem
            label="Industry Category"
            value={formData.nature_of_industry_category}
          />
          <ReviewItem
            label="Industry Sub-Category"
            value={formData.nature_of_industry_sub_category}
          />
          <ReviewItem label="Company Name" value={formData.name_of_company} />
          <ReviewItem
            label="Member of CIM"
            value={formData.member_of_CIM ? "Yes" : "No"}
          />
        </ReviewSection>

        <ReviewSection title="Contact Information">
          <ReviewItem label="Contact Name" value={formData.contact_name} />
          <ReviewItem
            label="Designation"
            value={formData.contact_designation}
          />
          <ReviewItem label="Contact Number" value={formData.contact_number} />
          <ReviewItem
            label="Email"
            value={formData.contact_email || "Not provided"}
          />
        </ReviewSection>

        <ReviewSection title="Address">
          <ReviewItem label="Province" value={formData.address_province} />
          <ReviewItem label="District" value={formData.address_district} />
          <ReviewItem
            label="Municipality"
            value={formData.address_municipality}
          />
          <ReviewItem label="Ward" value={formData.address_ward} />
          <ReviewItem label="Street" value={formData.address_street} />
        </ReviewSection>
      </div>
    </div>
  );
};

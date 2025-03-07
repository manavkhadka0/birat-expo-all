import { IssueWithoutBusinessSchema } from "@/app/business-clinic/schemas/issues-without-business";
import { ReviewSection } from "../review-components/ReviewSection";
import { ReviewItem } from "../review-components/ReviewItem";

export const ReviewStep = ({
  formData,
}: {
  formData: IssueWithoutBusinessSchema;
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Review Your Information</h3>

      <div className="grid gap-6">
        <ReviewSection title="Issue Details">
          <ReviewItem label="Title" value={formData.title} />
          <ReviewItem
            label="Description"
            value={formData.description}
            customClass="description-box" // Add custom class to handle overflow/scroll
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
      </div>
    </div>
  );
};

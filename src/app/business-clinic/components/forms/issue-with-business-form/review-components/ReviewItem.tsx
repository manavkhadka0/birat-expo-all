import React from "react";

export const ReviewItem = ({
  label,
  value,
  customClass,
  isHtml = false,
}: {
  label: string;
  value: string;
  customClass?: string;
  isHtml?: boolean;
}) => {
  return (
    <div className={`grid grid-cols-2 gap-2 ${customClass || ""}`}>
      <span className="text-muted-foreground">{label}:</span>
      {isHtml ? (
        <span
          className="font-medium"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
};

import { DataNotFound } from "@/app/b2b/components/sections/errors/data-not-found";
import BusinessCard from "@/app/b2b/components/businessRegister/businesslist/businessGrid";
import { HeaderSubtitle } from "@/app/b2b/components/sections/common/header-subtitle";
import { ResponsiveContainer } from "@/app/b2b/components/sections/common/responsive-container";
import { BusinessInfo } from "@/app/b2b/types/business-registration";

type BusinessInformationPageProps = {
  businessInformation: BusinessInfo[];
};

export default function BusinessInformationPage({
  businessInformation,
}: BusinessInformationPageProps) {
  if (!businessInformation.length) {
    return (
      <DataNotFound
        title="No Business Information Found"
        message="We couldn't find any business information at this time. Please try again later."
      />
    );
  }

  return (
    <ResponsiveContainer className="space-y-8 py-10">
      <HeaderSubtitle
        title="Business Information"
        subtitle="Explore key business details and insights for informed decision-making."
      />
      <div className="space-y-6">
        {businessInformation.map((info: BusinessInfo) => (
          <BusinessCard key={info.id} info={info} />
        ))}
      </div>
    </ResponsiveContainer>
  );
}

"use client";

import CategoryTabs from "@/app/b2b/components/bdsService/bdsList/bdsCategory";
import GridSection from "@/app/b2b/components/bdsService/bdsList/bdsGrid";
import { ResponsiveContainer } from "@/app/b2b/components/sections/common/responsive-container";
import { HeaderSubtitle } from "@/app/b2b/components/sections/common/header-subtitle";
import {
  BDSServiceCategoryResponse,
  BDSServiceResponse,
} from "@/app/b2b/types/bds-services";
import { useState } from "react";

type BDSViewProps = {
  bdsData: BDSServiceResponse;
  bdsCategory: BDSServiceCategoryResponse;
};

export default function BDSView({ bdsData, bdsCategory }: BDSViewProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBDSData = bdsData.results.filter((service) => {
    if (activeCategory === "All") return true;
    return service.category.name === activeCategory;
  });

  return (
    <ResponsiveContainer className="space-y-8 py-10">
      <HeaderSubtitle
        title="BDS Services: Finding the Perfect Service into your Request"
        subtitle="Explore a wide range of BDS services tailored to your needs."
      />
      {/* Category Tabs */}
      <CategoryTabs
        categories={[
          "All",
          ...bdsCategory.results.map((category) => category.name),
        ]}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Grid Section */}
      <GridSection services={filteredBDSData} />
    </ResponsiveContainer>
  );
}

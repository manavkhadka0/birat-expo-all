"use client";

import { HeaderSubtitle } from "@/app/b2b/components/sections/common/header-subtitle";
import { ResponsiveContainer } from "@/app/b2b/components/sections/common/responsive-container";
import { CreateWishOfferForm } from "@/app/b2b/components/sections/create-wish/create-wish-form";
import { useRouter } from "next/navigation";

export default function CreateWishPage() {
  const router = useRouter();
  return (
    <ResponsiveContainer className="py-10 space-y-8">
      <HeaderSubtitle
        title="Create a Wish"
        subtitle="Create a Wish to get help from the community"
        className="mb-8"
      />
      <CreateWishOfferForm
        is_wish_or_offer="wishes"
        onClose={() => {
          router.push("/wishOffer");
        }}
      />
    </ResponsiveContainer>
  );
}

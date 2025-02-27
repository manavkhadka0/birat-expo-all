"use client";

import { Hero } from "@/app/business-clinic/components/Hero";
import { MissionSection } from "@/app/business-clinic/components/MissionSection";
import { ContactSection } from "@/app/business-clinic/components/ContactSection";
import { Footer } from "@/app/business-clinic/components/Footer";
import { Features } from "@/app/business-clinic/components/Features";
import { Process } from "@/app/business-clinic/components/Process";
import { Testimonials } from "@/app/business-clinic/components/Testimonials";
import { useEffect, useState } from "react";
import Container from "./components/Container";

export default function Home() {
  const [statistics, setStatistics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `https://cim.baliyoventures.com/api/business_clinic/issues/statistics/`
        );
        if (!response.ok) throw new Error("Failed to fetch statistics");
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <Container>
          <Hero
            totalIssues={statistics?.total_issues || 0}
            openIssues={statistics?.open_issues || 0}
          />

          <MissionSection />

          <div className="container py-16">
            <Features />
            <Process />
            <Testimonials />
          </div>
          <ContactSection />
        </Container>
      </main>
      <Footer />
    </>
  );
}

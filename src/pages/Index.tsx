
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { AdvantagesSection } from "@/components/AdvantagesSection";
import { CoursesSection } from "@/components/CoursesSection";
import { DemoSection } from "@/components/DemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { LanguageSection } from "@/components/LanguageSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <AdvantagesSection />
      <CoursesSection />
      <DemoSection />
      <FeaturesSection />
      <TestimonialsSection />
      <LanguageSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
};

export default Index;

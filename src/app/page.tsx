import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InAction from "@/components/InAction";
import Pricing from "@/components/Pricing";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="bg-brand-dark">
      <Hero />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <InAction />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <FooterCTA />
      <Footer />
    </main>
  );
}

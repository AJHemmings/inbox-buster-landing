import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InAction from "@/components/InAction";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <InAction />
      <Pricing />
      <SocialProof />
      <FooterCTA />
      <Footer />
    </main>
  );
}

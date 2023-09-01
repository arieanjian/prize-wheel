import React from "react";
// component
import Header from "@/components/Layout/Header";
import {
  Navbar,
  Hero,
  Infos,
  Users,
  Prices,
  Footer,
  // Test,
} from "@/components/LandingPage";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-neutral-100 font-Roboto">
      <Header />

      <Navbar />

      <section className="flex-1 overflow-auto shrink-0">
        <Hero />
        <Infos />
        <Users />
        <Prices />
        {/* <Test /> */}
        <Footer />
      </section>
    </div>
  );
};

export default LandingPage;

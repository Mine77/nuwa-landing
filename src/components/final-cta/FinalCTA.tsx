import React from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { LogoLarge } from "../navigation/Logo";
import { Button } from "../shared/Button";

const FINAL_CTA_TEXTS = {
  heading: "Become an Early Adopter",
  subheading: "Join our Early Access Program and receive free integration, first month free, plus a 30% lifetime discount. Limited spots available.",
  ctaButton: "Apply Now"
};

export const FinalCTA = () => {
  return (
    <section className="-mt-8 bg-white px-2 py-24 md:px-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <LogoLarge />
        <SectionHeading>{FINAL_CTA_TEXTS.heading}</SectionHeading>
        <p className="mx-auto mb-8 text-center text-base leading-relaxed md:text-xl md:leading-relaxed">
          {FINAL_CTA_TEXTS.subheading}
        </p>
        <Button intent="primary">
          <span className="font-bold">{FINAL_CTA_TEXTS.ctaButton}</span>
        </Button>
      </div>
    </section>
  );
};

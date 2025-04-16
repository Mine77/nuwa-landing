import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "../shared/Button";

const HERO_TEXTS = {
  productHuntBadge: "NEW!",
  productHuntText: "Early Access Now Open!",
  heading: "Instant Intelligence for your Web3 Product",
  subheading: "Nuwa is a pioneering Agent-as-a-Service (AaaS) solution that enables any on-chain protocol, platform, or application to deploy customized AI agents with minimal technical overhead.",
  ctaButton: "Join Early Access"
};

export const Copy = () => {
  return (
    <>
      <div className="mb-1.5 rounded-full bg-zinc-600">
        <Link
          href="https://www.producthunt.com/"
          target="_blank"
          rel="nofollow"
          className="flex origin-top-left items-center rounded-full border border-zinc-900 bg-white p-0.5 text-sm transition-transform hover:-rotate-2"
        >
          <span className="rounded-full bg-[#FF6154] px-2 py-0.5 font-medium text-white">
            {HERO_TEXTS.productHuntBadge}
          </span>
          <span className="ml-1.5 mr-1 inline-block">
            {HERO_TEXTS.productHuntText}
          </span>
          <FiArrowUpRight className="mr-2 inline-block" />
        </Link>
      </div>
      <h1 className="max-w-4xl text-center text-4xl font-black leading-[1.15] md:text-7xl md:leading-[1.15]">
        {HERO_TEXTS.heading}
      </h1>
      <p className="mx-auto my-4 max-w-3xl text-center text-base leading-relaxed md:my-6 md:text-2xl md:leading-relaxed">
        {HERO_TEXTS.subheading}
      </p>
      <Button>
        <span className="font-bold">{HERO_TEXTS.ctaButton}</span>
      </Button>
    </>
  );
};

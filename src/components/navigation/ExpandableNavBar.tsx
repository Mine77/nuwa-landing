import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";
import { DesktopLinks, LinkType } from "./DesktopLinks";
import { MobileLinks } from "./MobileLinks";
import { Announcement } from "./Announcement";
import { Button } from "../shared/Button";

export const ExpandableNavBar = ({
  children,
  links,
}: {
  children?: ReactNode;
  links: LinkType[];
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <div className="bg-indigo-600 pt-2">
        {/* <Announcement /> */}
        <nav className="rounded-t-2xl bg-white p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <Logo />
              <DesktopLinks links={links} />
            </div>
            <Button className="hidden md:block" intent="secondary" size="small">
              <span className="font-bold">Get started</span>
            </Button>
            <button
              onClick={() => setMobileNavOpen((pv) => !pv)}
              className="mt-0.5 block text-2xl md:hidden"
            >
              <FiMenu />
            </button>
          </div>
          <MobileLinks links={links} open={mobileNavOpen} />
        </nav>
      </div>
      <motion.main layout>
        <div className="bg-white">{children}</div>
      </motion.main>
    </>
  );
};

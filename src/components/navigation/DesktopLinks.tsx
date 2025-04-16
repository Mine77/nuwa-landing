import React from "react";
import Link from "next/link";
import { LinkType } from "../../constants/navLinks";

export const DesktopLinks = ({
  links,
}: {
  links: LinkType[];
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <Link
            key={l.title}
            href={l.href}
            className="cursor-pointer text-zinc-950 hover:text-indigo-600"
          >
            {l.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

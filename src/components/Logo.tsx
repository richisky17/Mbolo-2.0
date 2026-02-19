"use client";

import Link from "next/link";
import LottieMascot from "./LottieMascot";

type LogoProps = {
  href?: string;
};

const Logo = ({ href = "/learn" }: LogoProps) => {
  return (
    <Link href={href} className="group">
      <div className="flex items-center gap-x-3 px-4 py-8 transition-all duration-200 group-hover:gap-x-4">
        <div className="transition-transform group-hover:scale-110">
          <LottieMascot width={40} height={40} />
        </div>

        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-700 group-hover:to-teal-700 transition-all duration-200">
          Mbolo
        </h1>
      </div>
    </Link>
  );
};

export default Logo;


import Image from "next/image";

import { cn } from "@/lib/utils";
import { UpgradeButton } from "@/components";

type PromoProps = {
  isMobile?: boolean;
  className?: string;
};

const Promo = ({ isMobile, className }: PromoProps) => (
  <div className={cn("border-2 border-emerald-200 rounded-2xl space-y-4 p-5 bg-gradient-to-br from-white to-emerald-50/30 shadow-md hover:shadow-lg transition-shadow duration-300", className)}>
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-x-2">
        <Image src="/unlimited.svg" alt="Pro" height={26} width={26} />
        <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Upgrade to Pro</h3>
      </div>

      <p className="text-neutral-600 text-center text-sm">
        Get unlimited hearts and more!
      </p>
    </div>

    <UpgradeButton isMobile={isMobile} />
  </div>
);

export default Promo;

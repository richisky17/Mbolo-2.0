import Link from "next/link";
import { cn } from "@/lib/utils";
import { NotebookText } from "lucide-react";

import { Button } from "@/components/ui";

type UnitBannerProps = {
  title: string;
  description: string;
  access: boolean;
};

const UnitBanner = ({ title, description, access }: UnitBannerProps) => (
  <div
    className={cn(
      "relative flex items-center justify-between bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white w-full gap-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden",
      {
        "bg-gradient-to-r from-neutral-200 to-neutral-300 text-neutral-500 shadow-sm": !access,
      }
    )}
  >
    {/* Decorative pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-300 rounded-full blur-2xl" />
    </div>
    
    {/* Animated gradient overlay */}
    {access && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    )}
    
    <div className="space-y-1.5 relative z-10">
      <h3 className="text-xl lg:text-2xl font-bold">{title}</h3>
      <p className="text-base lg:text-lg opacity-90">{description}</p>
    </div>

    <Link
      href="/lesson"
      aria-disabled={!access}
      className={cn("self-start relative z-10", {
        "pointer-events-none": !access,
      })}
    >
      <Button
        size="sm"
        variant={!access ? "locked" : "secondary"}
        disabled={!access}
        className={cn("flex border-2 border-b-4 active:border-b-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/40 hover:border-white/60 transition-all duration-200 hover:scale-105", {
          "text-neutral-400 border-neutral-400 bg-neutral-100": !access,
        })}
      >
        <NotebookText className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:block">Continue</span>
      </Button>
    </Link>
  </div>
);

export default UnitBanner;

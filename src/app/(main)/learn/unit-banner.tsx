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
      "relative flex items-center justify-between bg-gradient-to-r from-emerald-800/80 via-emerald-700/80 to-teal-800/80 text-white w-full gap-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-800",
      {
        "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 shadow-sm": !access,
      }
    )}
  >
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400 rounded-full blur-2xl" />
    </div>

    {access && (
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
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
        className={cn("flex border-2 border-b-4 active:border-b-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105", {
          "text-gray-400 border-gray-600 bg-gray-800/50": !access,
        })}
      >
        <NotebookText className="h-4 w-4 lg:mr-2" />
        <span className="hidden lg:block">Continuar</span>
      </Button>
    </Link>
  </div>
);

export default UnitBanner;
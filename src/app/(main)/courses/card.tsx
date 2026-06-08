import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  isEmpty?: boolean;
};

export function Card({
  title,
  id,
  imageSrc,
  onClick,
  disabled,
  active,
  isEmpty,
}: CardProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex flex-col items-center justify-between h-full min-h-[217px] min-w-[200px] cursor-pointer rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-gray-800/30 transition-all duration-200 relative bg-gray-900/30",
        {
          "pointer-events-none opacity-50": disabled,
          "border-emerald-500/50 shadow-lg shadow-emerald-500/10": active,
          "border-gray-700": !active,
        }
      )}
    >
      <div className="flex min-h-[28px] w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-emerald-600 p-1.5 shadow-md">
            <Check className="h-4 w-4 stroke-[4] text-white" />
          </div>
        )}
        {isEmpty && !active && (
          <div className="flex items-center justify-center rounded-md bg-amber-600/80 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-bold text-white">Próximamente</span>
          </div>
        )}
      </div>

      <Image
        alt={title}
        src={imageSrc}
        height={70}
        width={93.33}
        className="rounded-lg border border-gray-700 object-cover drop-shadow-md transition-transform group-hover:scale-105"
      />

      <p className="text-center font-bold text-white mt-3">{title}</p>
    </div>
  );
}
import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/server/db/schema";

type CardProps = {
  text: string;
  imageSrc: string | null;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  audioSrc: string | null;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

const Card = ({
  text,
  imageSrc,
  shortcut,
  selected,
  onClick,
  status,
  audioSrc,
  disabled,
  type,
}: CardProps) => {
  const [audio, _, controls] = useAudio({ src: audioSrc ?? "" });

  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-gray-800/50 cursor-pointer active:border-b-2 p-4 lg:p-6 bg-gray-900/80",
        {
          "border-emerald-500 bg-emerald-900/50 text-white": selected && status === "none",
          "border-green-500 bg-green-900/50 text-white":
            selected && status === "correct",
          "border-rose-500 bg-rose-900/50 text-white":
            selected && status === "wrong",
          "pointer-events-none hover:bg-gray-900/80": disabled,
          "w-full lg:p-3": type === "ASSIST",
        }
      )}
    >
      {audio}

      {imageSrc && (
        <div className="relative aspect-square max-h-[80px] lg:max-h-[150px] w-full mb-4">
          <Image fill src={imageSrc} alt={text} />
        </div>
      )}

      <div
        className={cn("flex items-center justify-between", {
          "flex-row-reverse": type === "ASSIST",
        })}
      >
        {type === "ASSIST" && <div />}

        <p
          className={cn("text-gray-200 text-sm lg:text-base", {
            "text-emerald-300": selected && status === "none",
            "text-green-400": selected && status === "correct",
            "text-rose-400": selected && status === "wrong",
          })}
        >
          {text}
        </p>

        <div
          className={cn(
            "flex items-center justify-center rounded-lg border-2 text-gray-400 lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] lg:text-[15px] text-xs font-semibold",
            {
              "border-emerald-500 text-emerald-400": selected && status === "none",
              "border-green-500 text-green-400":
                selected && status === "correct",
              "border-rose-500 text-rose-400":
                selected && status === "wrong",
            }
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default Card;
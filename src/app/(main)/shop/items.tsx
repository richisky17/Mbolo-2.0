"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui";
import { refillHearts } from "@/server/actions/user-progress";
import { DEFAULT_HEARTS_MAX, POINTS_TO_REFILL } from "@/constants";
import { createStripeUrl } from "@/server/actions/user-subscription";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === DEFAULT_HEARTS_MAX || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Algo salió mal."));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Algo salió mal."));
    });
  };

  return (
    <ul className="w-full space-y-4">
      {/* Item: Rellenar corazones */}
      <li className="flex flex-col lg:flex-row items-center w-full gap-x-4 gap-y-4 border border-gray-800 rounded-xl p-4 bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
        <div className="relative">
          <Image
            src="/heart.svg"
            alt="Heart"
            height={60}
            width={60}
            // Sin invertir colores
          />
          {hearts === DEFAULT_HEARTS_MAX && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
          )}
        </div>

        <div className="flex-1 text-center lg:text-left">
          <p className="text-white text-base lg:text-xl font-bold">
            Rellenar corazones
          </p>
          <p className="text-gray-400 text-sm">
            Recupera todos tus corazones al máximo.
          </p>
        </div>

        <Button
          size="sm"
          onClick={onRefillHearts}
          disabled={
            pending ||
            hearts === DEFAULT_HEARTS_MAX ||
            points < POINTS_TO_REFILL
          }
          className={cn(
            "min-w-[100px]",
            (hearts === DEFAULT_HEARTS_MAX || points < POINTS_TO_REFILL) &&
              "opacity-50 cursor-not-allowed"
          )}
          variant={hearts === DEFAULT_HEARTS_MAX ? "secondary" : "default"}
        >
          {hearts === DEFAULT_HEARTS_MAX ? (
            "Completo"
          ) : (
            <div className="flex items-center gap-1">
              <Image
                src="/points.svg"
                alt="Points"
                height={20}
                width={20}
                // Sin invertir colores
              />
              <span>{POINTS_TO_REFILL}</span>
            </div>
          )}
        </Button>
      </li>

      {/* Item: Corazones ilimitados */}
      <li className="flex flex-col lg:flex-row items-center w-full gap-x-4 gap-y-4 border border-gray-800 rounded-xl p-4 bg-gray-900/30 hover:bg-gray-900/50 transition-all duration-300">
        <Image
          src="/unlimited.svg"
          alt="Unlimited"
          height={60}
          width={60}
          // Sin invertir colores
        />

        <div className="flex-1 text-center lg:text-left">
          <p className="text-white text-base lg:text-xl font-bold">
            Corazones ilimitados
          </p>
          <p className="text-gray-400 text-sm">
            Disfruta de corazones infinitos y acelera tu aprendizaje.
          </p>
        </div>

        <Button
          size="sm"
          onClick={onUpgrade}
          disabled={pending}
          variant={hasActiveSubscription ? "secondary" : "default"}
          className="min-w-[100px]"
        >
          {hasActiveSubscription ? "Activo" : "Actualizar"}
        </Button>
      </li>
    </ul>
  );
};

export default Items;
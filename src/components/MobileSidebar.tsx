import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/Button";
import { getUserSubscription, getUserProgress } from "@/server/db/queries";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/Sheet";

import { Menu } from "lucide-react";
import { Promo } from "@/components";
import Logo from "@/components/Logo";
import { sidebarItems } from "@/constants";
import { MobileSidebarItem } from "@/components";

const MobileSidebar = async () => {
  const userSubscriptionData = getUserSubscription();
  const userProgressData = getUserProgress();

  const [userSubscription, userProgress] = await Promise.all([
    userSubscriptionData,
    userProgressData,
  ]);

  const isPro = !!userSubscription?.isActive;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white h-9 w-9" />
      </SheetTrigger>

      <SheetContent
        className="z-[100] flex flex-col h-full border-r-2 p-0 px-4"
        side="left"
      >
        <SheetClose asChild>
          <div>
            <Logo />
          </div>
        </SheetClose>

        <div className="flex flex-1 flex-col gap-y-2">
          {sidebarItems.map((item, i) => (
            <MobileSidebarItem
              key={i}
              href={item.href}
              label={item.label}
              iconSrc={item.iconSrc}
              hasActiveCourse={!!userProgress?.activeCourseId}
            />
          ))}
        </div>

        <Promo
          isMobile
          className={cn("mb-4", {
            hidden: isPro,
          })}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

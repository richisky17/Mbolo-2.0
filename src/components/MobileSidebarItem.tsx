"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/Button";
import { SheetClose } from "@/components/ui/Sheet";

type MobileSidebarItemProps = {
  href: string;
  label: string;
  iconSrc: string;
  hasActiveCourse: boolean;
};

const MobileSidebarItem = ({ 
  href, 
  label, 
  iconSrc, 
  hasActiveCourse 
}: MobileSidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (!hasActiveCourse) {
      toast.error("Please select a course first!");
      router.push("/courses");
      return;
    }
    router.push(href);
  };

  return (
    <SheetClose asChild>
      <button
        onClick={handleClick}
        className={cn(
          buttonVariants({
            variant: pathname === href ? "sidebar" : "sidebarOutline",
            className: "h-[52px] justify-start w-full",
          })
        )}
      >
        <Image
          alt={label}
          src={iconSrc}
          height={32}
          width={32}
          className="mr-5 md:mr-3 lg:mr-5"
        />
        {label}
      </button>
    </SheetClose>
  );
};

export default MobileSidebarItem;


"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type SidebarItemProps = {
  href: string;
  label: string;
  iconSrc: string;
  hasActiveCourse: boolean;
};

const SidebarItem = ({ href, label, iconSrc, hasActiveCourse }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const active = pathname === href;

  const handleClick = () => {
    if (!hasActiveCourse) {
      toast.error("Please select a course first!");
      router.push("/courses");
      return;
    }
    router.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      variant={active ? "sidebar" : "sidebarOutline"}
      className="h-[52px] justify-start"
    >
      <Image
        alt={label}
        src={iconSrc}
        height={32}
        width={32}
        className="mr-5 md:mr-3 lg:mr-5"
      />

      {label}
    </Button>
  );
};

export default SidebarItem;

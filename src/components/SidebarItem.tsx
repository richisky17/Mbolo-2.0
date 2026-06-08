"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    // Si es la ruta de juegos, mostramos mensaje y no hacemos nada más
    if (href === "/games") {
      toast.info("🚧 Próximamente. ¡Estamos trabajando en ello! 🚧");
      return;
    }

    if (!hasActiveCourse) {
      toast.error("Por favor, selecciona un curso primero.");
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
        className={cn("mr-5 md:mr-3 lg:mr-5", {
          // Si el icono es de juegos y quieres invertir colores (opcional)
          // "invert": href === "/games"
        })}
      />
      {label}
    </Button>
  );
};

export default SidebarItem;
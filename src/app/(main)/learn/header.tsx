import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <div className="sticky top-[60px] md:top-0 flex items-center justify-between border-b-2 border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 backdrop-blur-sm text-neutral-700 mb-5 py-4 px-2 z-50 md:mt-[-28px] md:pt-[28px] rounded-b-lg">
    <Link href="/courses">
      <Button size="sm" variant="defaultOutline" className="hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300">
        <ArrowLeft className="h-5 w-5 stroke-2 text-emerald-600" />
      </Button>
    </Link>

    <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{title}</h1>
    <div />
  </div>
);

export default Header;

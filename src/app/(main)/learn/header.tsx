import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <div className="sticky top-[60px] md:top-0 flex items-center justify-between border-b border-gray-800 bg-black/50 backdrop-blur-sm text-gray-200 mb-5 py-4 px-2 z-50 md:mt-[-28px] md:pt-[28px] rounded-b-lg">
    <Link href="/courses">
      <Button size="sm" variant="defaultOutline" className="hover:bg-gray-800 border-gray-700 hover:border-emerald-500 text-gray-300">
        <ArrowLeft className="h-5 w-5 stroke-2 text-emerald-400" />
      </Button>
    </Link>

    <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
      {title}
    </h1>
    <div />
  </div>
);

export default Header;
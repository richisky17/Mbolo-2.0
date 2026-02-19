import Header from "./header";
import Footer from "./footer";
import { PropsWithChildren } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex flex-1 flex-col items-center justify-center">
          {children}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default MarketingLayout;

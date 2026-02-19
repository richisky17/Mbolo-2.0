"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import LottieMascot from "@/components/LottieMascot";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-lg px-4 sm:px-6 shadow-sm">
      <div className="mx-auto flex h-16 sm:h-20 items-center justify-between lg:max-w-7xl">
        <Link href="/" className="flex items-center gap-x-2 sm:gap-x-3 group cursor-pointer flex-shrink-0 min-w-0">
          <div className="transition-transform group-hover:scale-110 flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12">
            <LottieMascot width={48} height={48} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
            Mbolo
          </h1>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            {t("header.features")}
          </Link>
          <Link href="/about-us" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            {t("header.about")}
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
            {t("header.contact")}
          </Link>
        </nav>

        {/* Right side - Language Selector + Auth */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <LanguageSelector />

          <ClerkLoading>
            <SignedOut>
              <Button
                disabled
                size="lg"
                className="w-[100px] sm:w-[120px] h-9 sm:h-11 animate-pulse bg-gray-200"
              />
            </SignedOut>

            <SignedIn>
              <Button
                disabled
                size="rounded"
                className="h-9 w-9 sm:h-10 sm:w-10 animate-pulse bg-gray-200"
              />
            </SignedIn>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonPopoverCard: {
                      pointerEvents: "initial",
                      width: "300px",
                    },
                    userButtonAvatarBox: {
                      height: "36px",
                      width: "36px",
                    },
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/learn"
                signUpForceRedirectUrl="/learn"
              >
                <Button 
                  size="lg"
                  className="text-sm sm:text-base px-4 sm:px-6 h-9 sm:h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transition-all border-0 whitespace-nowrap"
                >
                  {t("header.login")}
                </Button>
              </SignInButton>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;

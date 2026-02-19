"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import LottieMascot from "@/components/LottieMascot";
import { Brain, Zap, Trophy, Users, Star, Globe, Smartphone, Download, Bell, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

        <div className="relative mx-auto flex flex-1 flex-col w-full max-w-7xl items-center justify-center gap-8 px-6 py-16 lg:py-24 lg:flex-row">
          {/* Left side - Text Content */}
          <div className="flex flex-col items-center lg:items-start gap-y-8 flex-1 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium">
              <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              #1 Plataforma de aprendizaje de lengua vernaculas de Guinea Ecuatorial
            </div>

            <h1 className="max-w-2xl text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="max-w-xl text-center lg:text-left text-lg text-gray-600">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-md items-center gap-4">
              <ClerkLoading>
                <SignedOut>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="h-[56px] flex-1 animate-pulse bg-gray-200 rounded-2xl" />
                    <div className="h-[56px] flex-1 animate-pulse bg-gray-200 rounded-2xl" />
                  </div>
                </SignedOut>

                <SignedIn>
                  <div className="h-[56px] w-full animate-pulse bg-gray-200 rounded-2xl" />
                </SignedIn>
              </ClerkLoading>

              <ClerkLoaded>
                <SignedOut>
                  <SignUpButton
                    mode="modal"
                    forceRedirectUrl="/learn"
                    signInForceRedirectUrl="/learn"
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-lg px-8 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all border-0"
                    >
                      {t("hero.cta.primary")}
                    </Button>
                  </SignUpButton>

                  <SignInButton
                    mode="modal"
                    forceRedirectUrl="/learn"
                    signUpForceRedirectUrl="/learn"
                  >
                    <Button 
                      size="lg" 
                      variant="primaryOutline"
                      className="w-full sm:w-auto text-lg px-8 h-14 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                    >
                      {t("header.login")}
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Button 
                    size="lg" 
                    className="w-full text-lg px-8 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all border-0" 
                    asChild
                  >
                    <Link href="/learn">Sigue aprendiendo</Link>
                  </Button>
                </SignedIn>
              </ClerkLoaded>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">10M+</div>
                <div className="text-sm text-gray-600">Usuarios Activos</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">lenguas Vernaculas</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-600">Valoraciones</div>
              </div>
            </div>
          </div>

          {/* Right side - Mascot */}
          <div className="relative flex items-center justify-center flex-1 z-10">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-20" />
              <LottieMascot width={500} height={500} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.smart.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.smart.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.fast.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.fast.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.gamified.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.gamified.description")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.community.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.community.description")}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.languages.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.languages.description")}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t("features.results.title")}
              </h3>
              <p className="text-gray-600">
                {t("features.results.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Apps Coming Soon Section */}
      <section className="py-12 md:py-20 px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left px-2 sm:px-0">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-700 text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                {t("mobile.badge")}
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                {t("mobile.title")}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t("mobile.subtitle")}
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0">
                {t("mobile.description")}
              </p>

              {/* Features List */}
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("mobile.feature.offline")}</h4>
                    <p className="text-gray-600 text-sm">{t("mobile.feature.offline.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("mobile.feature.notifications")}</h4>
                    <p className="text-gray-600 text-sm">{t("mobile.feature.notifications.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("mobile.feature.sync")}</h4>
                    <p className="text-gray-600 text-sm">{t("mobile.feature.sync.desc")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t("mobile.feature.voice")}</h4>
                    <p className="text-gray-600 text-sm">{t("mobile.feature.voice.desc")}</p>
                  </div>
                </div>
              </div>

              {/* App Store Badges */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-center lg:justify-start w-full sm:w-auto">
                <button className="group flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-black hover:bg-gray-900 text-white rounded-xl transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
                  <div className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6 fill-white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">{t("mobile.app.download")}</div>
                    <div className="text-base md:text-lg font-semibold -mt-1">{t("mobile.app.apple")}</div>
                  </div>
                </button>

                <button className="group flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-black hover:bg-gray-900 text-white rounded-xl transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
                  <div className="w-7 md:w-8 h-7 md:h-8 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 md:w-6 h-5 md:h-6 fill-white">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">{t("mobile.app.getin")}</div>
                    <div className="text-base md:text-lg font-semibold -mt-1">{t("mobile.app.google")}</div>
                  </div>
                </button>
              </div>

              {/* Early Access Form */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <Download className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{t("mobile.early.title")}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  {t("mobile.early.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                  <input
                    type="email"
                    placeholder={t("mobile.early.placeholder")}
                    className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-sm sm:text-base"
                  />
                  <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap">
                    {t("mobile.early.cta")}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile-friendly icon display (shows only on small screens) */}
            <div className="order-1 md:hidden mb-8">
              <div className="flex justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">iOS</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">Android</span>
                </div>
              </div>
            </div>

            {/* Right side - Phone Mockups (hidden on mobile) */}
            <div className="order-1 lg:order-2 relative hidden md:flex md:justify-center lg:justify-end">
              <div className="relative w-64 lg:w-72">
                {/* Decorative gradient circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full opacity-10 blur-3xl" />
                
                {/* Phone Mockup - iOS style */}
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                  <div className="relative w-full aspect-[9/19.5] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-b-2xl z-10" />
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-gradient-to-b from-gray-50 to-white rounded-[2.2rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 pt-1">
                        <span className="text-gray-900 text-[10px] font-semibold">9:41</span>
                        <div className="flex gap-0.5 items-center">
                          <div className="w-3 h-2 border border-gray-900 rounded-sm relative">
                            <div className="absolute inset-0.5 bg-gray-900 rounded-[1px]" />
                          </div>
                          <div className="w-0.5 h-1 bg-gray-900 rounded-full" />
                        </div>
                      </div>

                      {/* App Content Preview */}
                      <div className="pt-8 p-4">
                        {/* App Header - Compact */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900">Mbolo</h3>
                            <p className="text-[10px] text-gray-500">Aprende lenguas vernaculas</p>
                          </div>
                        </div>

                        {/* Mock lesson cards - Improved */}
                        <div className="space-y-2">
                          {/* Active Lesson */}
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-3 border border-emerald-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">FA</span>
                                <span className="text-xs font-semibold text-gray-900">Fang</span>
                              </div>
                              <span className="text-[10px] text-emerald-600 font-medium">Saludos-Meberan</span>
                            </div>
                            <div className="space-y-1">
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{width: '65%'}} />
                              </div>
                              <span className="text-[9px] text-gray-600">65% Completo</span>
                            </div>
                          </div>

                          {/* Other Courses */}
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg opacity-60">BU</span>
                                <div>
                                  <span className="text-xs font-medium text-gray-900">Bubi</span>
                                  <span className="block text-[9px] text-gray-500">Saludos-</span>
                                </div>
                              </div>
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-[10px] text-gray-400">→</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg opacity-60">ND</span>
                                <div>
                                  <span className="text-xs font-medium text-gray-900">Ndowe</span>
                                  <span className="block text-[9px] text-gray-500">Saludos</span>
                                </div>
                              </div>
                              <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                <span className="text-[10px] text-gray-400">→</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating stats badge - Improved */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-2.5 shadow-lg border border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-yellow-600" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-gray-900">Racha de 7 dias seguidos</div>
                                <div className="text-[9px] text-gray-500">Sigue asi 🔥</div>
                              </div>
                            </div>
                            <div className="text-xl">🎉</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10" />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/learn"
                signInForceRedirectUrl="/learn"
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 h-14 bg-white text-emerald-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all border-0"
                >
                  {t("hero.cta.primary")}
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <Button 
                size="lg" 
                className="text-lg px-10 h-14 bg-white text-emerald-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all border-0" 
                asChild
              >
                <Link href="/learn">{t("cta.button")}</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </section>
    </div>
  );
}

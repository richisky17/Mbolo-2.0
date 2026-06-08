"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Apple, Smartphone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui";
import LottieMascot from "@/components/LottieMascot";
import { Brain, Zap, Trophy, Users, Star, Globe, Download, Bell, CheckCircle2, BookOpen, Heart } from "lucide-react";
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
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const selected = localStorage.getItem("selectedCountry");
    if (selected !== "GQ") {
      router.push("/select-country");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  // Mostrar un loader mientras se verifica
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-900 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-teal-900 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-900 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-4000" />

        <div className="relative mx-auto flex flex-1 flex-col w-full max-w-7xl items-center justify-center gap-8 px-6 py-16 lg:py-24 lg:flex-row">
          <div className="flex flex-col items-center lg:items-start gap-y-8 flex-1 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-emerald-300 text-sm font-medium">
              <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              Hecho en Guinea Ecuatorial 🇬🇶
            </div>

            <h1 className="max-w-2xl text-center lg:text-left text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              {t("hero.title")}{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="max-w-xl text-center lg:text-left text-lg text-gray-300">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-md items-center gap-4">
              <ClerkLoading>
                <SignedOut>
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="h-[56px] flex-1 animate-pulse bg-gray-700 rounded-2xl" />
                    <div className="h-[56px] flex-1 animate-pulse bg-gray-700 rounded-2xl" />
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="h-[56px] w-full animate-pulse bg-gray-700 rounded-2xl" />
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
                      className="w-full sm:w-auto text-lg px-8 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all border-0"
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
                      className="w-full sm:w-auto text-lg px-8 h-14 border-2 border-emerald-500 text-emerald-300 hover:bg-gray-800"
                    >
                      {t("header.login")}
                    </Button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <Button 
                    size="lg" 
                    className="w-full text-lg px-8 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all border-0" 
                    asChild
                  >
                    <Link href="/learn">Sigue aprendiendo</Link>
                  </Button>
                </SignedIn>
              </ClerkLoaded>
            </div>

          {/* Testimonios con imágenes reales */}
<div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
  <div className="flex -space-x-2">
    <Image
      src="/Jov1.png"
      alt="Estudiante 1"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover shadow-md"
    />
    <Image
      src="/Jov2.png"
      alt="Estudiante 2"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover shadow-md"
    />
    <Image
      src="/Jov3.png"
      alt="Estudiante 3"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover shadow-md"
    />
    <Image
      src="/Jov4.png"
      alt="Estudiante 4"
      width={48}
      height={48}
      className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover shadow-md"
    />
  </div>
  <div className="text-gray-300 text-sm max-w-xs">
    Únete a miles de personas que están aprendiendo sus lenguas.
  </div>
</div>
          </div>

          <div className="relative flex items-center justify-center flex-1 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur-3xl opacity-30" />
              <LottieMascot width={500} height={500} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 4 columnas */}
      <section className="py-12 px-6 bg-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("features.smart.title")}</h3>
              <p className="text-gray-400">{t("features.smart.description")}</p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("features.fast.title")}</h3>
              <p className="text-gray-400">{t("features.fast.description")}</p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("features.gamified.title")}</h3>
              <p className="text-gray-400">{t("features.gamified.description")}</p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t("features.community.title")}</h3>
              <p className="text-gray-400">{t("features.community.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Apps Section - Aprende Sobre la Marcha */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda - Contenido textual y formulario */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t("mobile.title") || "Aprende Sobre la Marcha"}{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {t("mobile.subtitle") || "Aplicaciones Móviles"}
                </span>
              </h2>

              <p className="text-lg text-gray-300 max-w-lg">
                {t("mobile.description") || "Lleva tu aprendizaje de idiomas a cualquier lugar con nuestras próximas aplicaciones para iOS y Android. Practica durante tu viaje, hora de almuerzo o en cualquier momento."}
              </p>

              {/* Características en grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t("mobile.feature.offline") || "Modo Sin Conexión"}</h4>
                    <p className="text-sm text-gray-400">{t("mobile.feature.offline.desc") || "Descarga lecciones y aprende sin internet"}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t("mobile.feature.notifications") || "Notificaciones Push"}</h4>
                    <p className="text-sm text-gray-400">{t("mobile.feature.notifications.desc") || "Recordatorios diarios para mantener tu racha"}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Download className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t("mobile.feature.sync") || "Sincronización entre Dispositivos"}</h4>
                    <p className="text-sm text-gray-400">{t("mobile.feature.sync.desc") || "Continúa sin problemas donde lo dejaste"}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t("mobile.feature.voice") || "Reconocimiento de Voz"}</h4>
                    <p className="text-sm text-gray-400">{t("mobile.feature.voice.desc") || "Practica pronunciación con retroalimentación IA"}</p>
                  </div>
                </div>
              </div>

              {/* Botones de tiendas */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-900 rounded-xl p-3 flex items-center gap-3 border border-gray-800 hover:border-emerald-500 transition-colors cursor-pointer">
                  <Apple className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-xs text-gray-400">{t("mobile.app.getin") || "Descárgalo en"}</p>
                    <p className="text-sm font-semibold text-white">{t("mobile.app.apple") || "App Store"}</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-3 flex items-center gap-3 border border-gray-800 hover:border-emerald-500 transition-colors cursor-pointer">
                  <Smartphone className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-xs text-gray-400">{t("mobile.app.getin") || "Descárgalo en"}</p>
                    <p className="text-sm font-semibold text-white">{t("mobile.app.google") || "Google Play"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Imagen estática FON SIN FONDO.png */}
            <div className="relative flex justify-center items-center overflow-visible">
              <div className="relative w-full flex justify-center items-center">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-950 to-teal-950 rounded-full blur-2xl -z-10" />
                <div className="transform scale-[1.1] origin-center">
                  <Image
                    src="/FON SIN FONDO.png"
                    alt="Fondo decorativo"
                    width={400}
                    height={600}
                    className="w-auto h-auto max-w-none opacity-80 pointer-events-none"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nueva Sección Identidad */}
      <section className="py-20 px-6 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-900 rounded-full mix-blend-overlay filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-900 rounded-full mix-blend-overlay filter blur-3xl opacity-10" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid md:grid-cols-[40%_60%] gap-12 items-center">
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full text-emerald-300 text-sm font-medium">
                <Globe className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                UNA COMUNIDAD GLOBAL
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Juntos preservamos nuestra identidad
              </h2>
              <p className="text-lg text-gray-300 max-w-lg">
                Conectando estudiantes con habitantes nativos de todo el mundo que comparten su amor por nuestras lenguas.
              </p>
            </div>
            
            <div className="flex justify-end">
              <div className="relative w-full transform scale-200 origin-right transform-gpu">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-950 to-teal-990 rounded-full blur-3xl opacity-30" />
                <div className="relative rounded-1xl overflow-hidden">
                  <Image
                    src="/MAPA_CENTRADO.png"
                    alt="Mapa de Guinea Ecuatorial con lenguas"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
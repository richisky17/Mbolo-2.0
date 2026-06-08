"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LottieMascot from "@/components/LottieMascot";
import { CheckCircle2, Lock } from "lucide-react";

// Países de la CEMAC
const countries = [
  { name: "Guinea Ecuatorial", flag: "/flags/gnq.svg", code: "GQ", available: true },
  { name: "Camerún", flag: "/flags/cmr.svg", code: "CM", available: false },
  { name: "Chad", flag: "/flags/tcd.svg", code: "TD", available: false },
  { name: "Gabón", flag: "/flags/gab.svg", code: "GA", available: false },
  { name: "República Centroafricana", flag: "/flags/caf.svg", code: "CF", available: false },
  { name: "República del Congo", flag: "/flags/cog.svg", code: "CG", available: false },
];

export default function SelectCountryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);

  // Cargar país guardado al inicio
  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry");
    if (saved) {
      setCurrentCountry(saved);
      // Si ya hay un país seleccionado, lo preseleccionamos
      const savedCountry = countries.find(c => c.code === saved);
      if (savedCountry && savedCountry.available) {
        setSelected(saved);
      }
    }
  }, []);

  const handleSelect = (code: string, available: boolean) => {
    if (!available) {
      alert("Próximamente disponible. ¡Sigue atento!");
      return;
    }
    setSelected(code);
  };

  const handleConfirm = () => {
    if (selected) {
      // Si el país seleccionado es diferente al actual o no hay actual, lo guardamos
      if (selected !== currentCountry) {
        localStorage.setItem("selectedCountry", selected);
      }
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-900 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-900 rounded-full mix-blend-overlay filter blur-xl opacity-20 animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <LottieMascot width={150} height={150} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            ¡Bienvenido a Mbolo!
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Selecciona tu país de la CEMAC para comenzar tu viaje de aprendizaje de lenguas vernáculas.
          </p>
          {currentCountry && (
            <p className="text-emerald-400 text-sm mt-2">
              País actual: {countries.find(c => c.code === currentCountry)?.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleSelect(country.code, country.available)}
              className={`relative p-4 rounded-2xl border-2 transition-all ${
                selected === country.code
                  ? "border-emerald-500 bg-emerald-900/30"
                  : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
              } ${!country.available && "opacity-70 cursor-not-allowed"}`}
              disabled={!country.available}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-14 relative bg-gray-800 rounded-md overflow-hidden flex items-center justify-center text-4xl">
                  {country.flag ? (
                    <Image src={country.flag} alt={country.name} width={80} height={56} className="object-cover w-full h-full" />
                  ) : (
                    <span>🏳️</span>
                  )}
                </div>
                <span className="text-white font-medium text-sm text-center">{country.name}</span>
                {!country.available && <Lock className="absolute top-2 right-2 w-4 h-4 text-gray-400" />}
                {selected === country.code && country.available && <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-emerald-400" />}
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm}
            disabled={!selected}
            className={`px-10 py-3 rounded-xl text-lg font-semibold transition-all ${
              selected
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {selected ? (selected === currentCountry ? "Continuar" : "Cambiar país") : "Selecciona un país disponible"}
          </button>
        </div>
        <p className="text-center text-gray-400 text-sm mt-8">
          🇬🇶 Solo Guinea Ecuatorial está completamente disponible. ¡Los demás países llegarán pronto!
        </p>
      </div>
    </div>
  );
}
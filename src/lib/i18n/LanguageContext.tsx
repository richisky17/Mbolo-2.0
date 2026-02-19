"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type TranslationKey } from "./translations";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("en");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("Mbolo-language");
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguageState(savedLanguage);
      // Set cookie for server-side access
      document.cookie = `language=${savedLanguage}; path=/; max-age=31536000; SameSite=Lax`;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (translations[browserLang as keyof typeof translations]) {
        setLanguageState(browserLang);
        document.cookie = `language=${browserLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("Mbolo-language", lang);
    
    // Also set cookie for server-side access
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const t = (key: TranslationKey): string => {
    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    return currentTranslations[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}


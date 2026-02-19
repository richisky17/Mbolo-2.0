"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { languages } from "@/lib/i18n/translations";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLanguage.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 transition-colors ${
                language === lang.code ? "bg-emerald-100" : ""
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900">{lang.nativeName}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </div>
              {language === lang.code && (
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LottieMascot from "@/components/LottieMascot";
import { Facebook, Twitter, Instagram, Youtube, Globe, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type SocialMediaLink = {
  id: number;
  platform: string;
  url: string;
  order: number;
};

const Footer = () => {
  const { t } = useLanguage();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch("/api/social-media-links");
        if (response.ok) {
          const data = await response.json();
          setSocialLinks(data);
        }
      } catch (error) {
        console.error("Failed to fetch social media links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "twitter":
        return <Twitter className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "instagram":
        return <Instagram className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "youtube":
        return <Youtube className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "discord":
        return <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      case "tiktok":
        return <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
      default:
        return <Globe className="w-5 h-5 text-gray-600 group-hover:text-emerald-600" />;
    }
  };
  
  const languages = [
    { name: t("footer.languages.spanish"), flag: "/es.svg", popular: true },
    { name: t("footer.languages.french"), flag: "/fr.svg", popular: true },
    { name: t("footer.languages.japanese"), flag: "/jp.svg", popular: false },
    { name: t("footer.languages.italian"), flag: "/it.svg", popular: false },
    { name: t("footer.languages.croatian"), flag: "/hr.svg", popular: false },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-x-3">
              <LottieMascot width={40} height={40} />
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Mbolo
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-colors group"
                    aria-label={`Visit our ${link.platform} page`}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))
              ) : null}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("footer.product")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.product.courses")}
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.product.learn")}
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.product.leaderboard")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.product.shop")}
                </Link>
              </li>
              <li>
                <Link href="/quests" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.product.quests")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.company.about")}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.company.careers")}
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.company.press")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.company.blog")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.company.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">{t("footer.support")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help-center" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.support.help")}
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.support.guidelines")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.support.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.support.terms")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-600 hover:text-emerald-600 text-sm transition-colors">
                  {t("footer.support.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Languages Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">{t("footer.languages.title")}</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <button
                key={lang.name}
                className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 rounded-full transition-all"
              >
                <Image
                  src={lang.flag}
                  alt={lang.name}
                  height={20}
                  width={20}
                  className="rounded-sm"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  {lang.name}
                </span>
                {lang.popular && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    {t("footer.languages.popular")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Mbolo. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                {t("footer.support.privacy")}
              </Link>
              <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                {t("footer.support.terms")}
              </Link>
              <Link href="/cookie-policy" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                {t("footer.support.cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

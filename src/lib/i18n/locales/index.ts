import en from "./en";
import es from "./es";
import fr from "./fr";
//import de from "./de";
//import it from "./it";
//import pt from "./pt";
//import ja from "./ja";
//import zh from "./zh";

export const translations = {
  en,
  es,
  fr,
 // de,
  //it,
  //pt,
  //ja,
  //zh,
} as const;

export type TranslationKey = keyof typeof en;
export type SupportedLanguage = keyof typeof translations;


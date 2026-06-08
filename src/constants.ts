export const POINTS_TO_REFILL = 10;
export const DEFAULT_HEARTS_MAX = 5;
export const DEFAULT_POINTS_START = 0;
export const POINTS_PER_CHALLENGE = 10;

export const quests = [
  {
    title: "Gana 1.000 XP",
    value: 1000,
  },
  {
    title: "Gana 3.000 XP",
    value: 3000,
  },
  {
    title: "Gana 5.000 XP",
    value: 5000,
  },
  {
    title: "Gana 10.000 XP",
    value: 10000,
  },
];

export const sidebarItems = [
  {
    href: "/learn",
    label: "Aprender",
    iconSrc: "/learn.svg",
  },
  {
    href: "/pronunciation",
    label: "Pronunciación",
    iconSrc: "/quests.svg",
  },
  {
    href: "/leaderboard",
    label: "Clasificación",
    iconSrc: "/leaderboard.svg",
  },
  {
    href: "/games",
    label: "Juegos 🔒",    // 👈 añadimos candado
    iconSrc: "/games.svg",
  },
  {
    href: "/quests",
    label: "Misiones",
    iconSrc: "/quests.svg",
  },
  {
    href: "/shop",
    label: "Tienda",
    iconSrc: "/shop.svg",
  },
];
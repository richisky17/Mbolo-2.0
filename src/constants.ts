export const POINTS_TO_REFILL = 10;
export const DEFAULT_HEARTS_MAX = 5;
export const DEFAULT_POINTS_START = 0;
export const POINTS_PER_CHALLENGE = 10;

export const quests = [
  {
    title: "Gana 20 XP",
    value: 20,
  },
  {
    title: "Gana 50 XP",
    value: 50,
  },
  {
    title: "Gana 100 XP",
    value: 100,
  },
  {
    title: "Gana 500 XP",
    value: 500,
  },
  {
    title: "Gana 1000 XP",
    value: 1000,
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
    label: "Prononciation",
    iconSrc: "/quests.svg", // You can add a pronunciation icon later
  },
  {
    href: "/leaderboard",
    label: "Clasificación",
    iconSrc: "/leaderboard.svg",
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

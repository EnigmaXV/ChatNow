import { create } from "zustand";
const getThemeFromLocalStorage = () => {
  const stored = localStorage.getItem("theme");
  return stored || "black";
};

export const useThemeStore = create((set) => ({
  currentTheme: getThemeFromLocalStorage(),
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ currentTheme: theme });
    document.documentElement.setAttribute("data-theme", theme);
  },
}));

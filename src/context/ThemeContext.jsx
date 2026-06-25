import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function lighten(hex, pct) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (n >> 16) + Math.round(255 * pct));
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * pct));
  const b = Math.min(255, (n & 0xff) + Math.round(255 * pct));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const DEFAULT_CUSTOM = { primary: "#7b4fc4", accent: "#e05c1a" };

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(
    () => localStorage.getItem("sl_theme") || "light"
  );
  const [customColors, setCustomColorsState] = useState(() => {
    try {
      const s = localStorage.getItem("sl_custom_colors");
      return s ? JSON.parse(s) : DEFAULT_CUSTOM;
    } catch {
      return DEFAULT_CUSTOM;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "custom") {
      root.style.setProperty("--color-primary", customColors.primary);
      root.style.setProperty("--color-primary-light", lighten(customColors.primary, 0.15));
      root.style.setProperty("--color-accent", customColors.accent);
      root.style.setProperty("--color-accent-light", lighten(customColors.accent, 0.2));
    } else {
      ["--color-primary", "--color-primary-light", "--color-accent", "--color-accent-light"].forEach(
        (v) => root.style.removeProperty(v)
      );
    }
    localStorage.setItem("sl_theme", theme);
  }, [theme, customColors]);

  const setTheme = (t) => setThemeState(t);

  const setCustomColors = (colors) => {
    setCustomColorsState(colors);
    localStorage.setItem("sl_custom_colors", JSON.stringify(colors));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

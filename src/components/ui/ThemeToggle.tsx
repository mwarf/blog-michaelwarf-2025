"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type Theme = "dark" | "light"; // Simplified theme state

export function ThemeToggle() {
  // Initialize state based on localStorage or system preference, defaulting to light
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof localStorage !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        return storedTheme;
      }
    }
    // Check system preference if no stored theme
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    // Default to light
    return "light";
  });
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Component did mount

    // Apply the theme class based on the current state
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Store the preference in localStorage
    localStorage.setItem("theme", theme);

  }, [theme]); // Rerun effect only when theme state changes


  const toggleTheme = () => {
    // Directly toggle between light and dark
    setThemeState((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

   // Avoid rendering button content on server until mounted
   if (!mounted) {
     // Render a placeholder during SSR/initial client render
     // Show Sun icon initially as a safe default before hydration
     return <Button variant="ghost" size="icon" disabled><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
   }

  // Now theme state directly reflects the desired mode (light/dark)
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === "light" ? (
         <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
         <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button variant="ghost" className="group/toggle" onClick={toggleTheme}>
      <SunIcon className="hidden [html.dark_&]:block size-4" />
      <MoonIcon className="hidden [html.light_&]:block size-4" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

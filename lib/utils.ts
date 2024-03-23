import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFileName(text: string): string {
  const cleanedText = text.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
  const lowercaseText = cleanedText.toLowerCase();
  const trimmedText = lowercaseText.slice(0, 30);

  return trimmedText;
}

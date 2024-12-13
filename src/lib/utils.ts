import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyWithComma(amount: number | string): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  // Ensure the number has two decimal places and add commas
  return numericAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

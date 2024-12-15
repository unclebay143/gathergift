import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyWithComma(
  amount: number | string
): string | number {
  if (!amount) return amount;

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  // Ensure the number has two decimal places and add commas
  return numericAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calculateProgressPercentage = (
  target_amount: number,
  contributed_amount: number | undefined
): number => {
  if (target_amount <= 0) {
    throw new Error("Target amount must be greater than zero.");
  }

  const percentage = (contributed_amount ?? 0 / target_amount) * 100;
  return Math.min(Math.max(percentage, 0), 100); // Clamp between 0 and 100
};

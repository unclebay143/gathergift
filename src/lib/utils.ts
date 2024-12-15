import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyWithComma(
  amount: number | string,
  options?: { includeDecimal?: boolean }
): string {
  const { includeDecimal = false } = options || {};

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount: Unable to format.");
  }

  return numericAmount
    .toFixed(includeDecimal ? 2 : 0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const calculateProgressPercentage = (
  target_amount: number,
  contributed_amount: number | undefined
): number => {
  if (target_amount <= 0) {
    throw new Error("Target amount must be greater than zero.");
  }

  return ((contributed_amount ?? 0) / target_amount) * 100;
};

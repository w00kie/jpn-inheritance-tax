import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function floorToZero(value: number): number {
  return Math.max(0, Math.floor(value));
}

export interface TaxInfo {
  owed: number;
  rate: number;
  deduction: number;
}

export function applyTaxRate(amount: number): TaxInfo {
  let output: TaxInfo = { owed: 0, rate: 0, deduction: 0 };
  if (amount <= 0) {
    return output;
  } else if (amount <= 10_000_000) {
    output.rate = 0.1;
  } else if (amount <= 30_000_000) {
    output.rate = 0.15;
    output.deduction = 500_000;
  } else if (amount <= 50_000_000) {
    output.rate = 0.2;
    output.deduction = 2_000_000;
  } else if (amount <= 100_000_000) {
    output.rate = 0.3;
    output.deduction = 7_000_000;
  } else if (amount <= 200_000_000) {
    output.rate = 0.4;
    output.deduction = 17_000_000;
  } else if (amount <= 300_000_000) {
    output.rate = 0.45;
    output.deduction = 27_000_000;
  } else if (amount <= 600_000_000) {
    output.rate = 0.5;
    output.deduction = 42_000_000;
  } else {
    output.rate = 0.55;
    output.deduction = 72_000_000;
  }
  output.owed = amount * output.rate - output.deduction;
  return output;
}

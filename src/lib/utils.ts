import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateYearsOfExperience = (): number => {
  const startDate = new Date('2023-05-01');
  const currentDate = new Date();
  
  let years = currentDate.getFullYear() - startDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startDate.getMonth();
  
  // If we haven't reached May of the current year, subtract 1
  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < startDate.getDate())) {
    years--;
  }
  
  return Math.max(0, years); // Ensure we don't return negative numbers
};
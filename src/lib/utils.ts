import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function safeFormatDate(
  date: string | Date | null | undefined,
  formatString: string,
  fallback: string = 'N/A'
): string {
  if (!date) return fallback;
  
  try {
    const dayjsDate = dayjs(date);
    if (!dayjsDate.isValid()) return fallback;
    return dayjsDate.format(formatString);
  } catch (error) {
    console.warn('Invalid date provided to safeFormatDate:', date, error);
    return fallback;
  }
}

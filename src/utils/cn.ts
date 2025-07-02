import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to conditionally concatenate class names with proper deduplication.
 * Combines `clsx` for conditional logic and `tailwind-merge` to avoid
 * conflicting Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

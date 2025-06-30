/**
 * Toast utilities for react-trophies
 * 
 * This module provides wrapper functions around sonner's toast capabilities
 * to allow for consistent styling of achievement toasts across an application.
 */
import { toast as sonnerToast, type ExternalToast } from 'sonner';
import React from 'react';


/**
 * Creates and displays a toast notification using sonner
 * 
 * This is a simple wrapper around sonner's toast function that can be used for
 * custom styling across your application. Use this to maintain consistent styling
 * for trophy notifications.
 * 
 * @param {string} title - The title of the toast
 * @param {ExternalToast} options - Options for the toast (same as sonner's options)
 * @returns The toast ID
 */
export const toast = (title: string, options?: ExternalToast) => {
  return sonnerToast(title, options);
};

/**
 * Checks if a Toaster component is mounted in the DOM.
 * Useful for debugging or adding conditional toast behavior.
 * 
 * @returns {boolean} True if a Toaster component is found in the DOM
 */
export const isToasterMounted = (): boolean => {
  return typeof document !== 'undefined' && 
         document.querySelector('[data-sonner-toaster]') !== null;
};

/**
 * Helper function to determine if client-side code can safely call toast functions
 * to avoid SSR errors when toasting server-side
 * 
 * @returns {boolean} True if toast can be safely called
 */
export const canToast = (): boolean => {
  return typeof window !== 'undefined';
};

export default toast;

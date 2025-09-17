import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Phone number validation utility
export function validatePhoneNumber(phone: string): {
  isValid: boolean;
  error?: string;
} {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");

  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) {
    return {
      isValid: false,
      error: "Phone number must be exactly 10 digits",
    };
  }

  // Check if it contains only digits
  if (!/^\d{10}$/.test(cleanPhone)) {
    return {
      isValid: false,
      error: "Phone number must contain only digits",
    };
  }

  return { isValid: true };
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 10) {
    return `+91-${cleanPhone.slice(0, 5)}-${cleanPhone.slice(5)}`;
  }
  return phone;
}

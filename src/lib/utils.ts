import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * True for bright, near-neutral brand colours (white, silver, platinum).
 * Those need dark ink and a darker text tone when placed on light surfaces,
 * otherwise the badge text and tagline wash out. Saturated colours like the
 * gold or pink brands are excluded so their existing treatment is unchanged.
 */
export function isLightNeutralColor(hex: string): boolean {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!match) return false;

  const [r, g, b] = [1, 2, 3].map((i) => parseInt(match[i], 16) / 255);
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  const max = Math.max(r, g, b);
  const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;

  return luminance > 0.55 && saturation < 0.12;
}


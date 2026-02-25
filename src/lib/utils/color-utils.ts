/**
 * Determines the appropriate text color (dark or light) for a given background color.
 * Uses luminance formula to decide readability.
 */
export function getContrastColor(hexColor: string): { textColor: string; isLight: boolean } {
  const hex = (hexColor || '#4f46e5').replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) || 0;
  const g = parseInt(hex.slice(2, 4), 16) || 0;
  const b = parseInt(hex.slice(4, 6), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const isLight = luminance > 0.55;
  return { textColor: isLight ? '#1f2937' : '#ffffff', isLight };
}

export function normalizePhoneNumber(phone: string): string {
  // Csak visszaadjuk az eredeti telefonszámot minimális tisztítással
  // Megtartjuk a +, számjegyek, szóközök, kötőjelek karaktereket
  return phone.trim();
}

/**
 * Formats a phone number for display.
 * Normalizes Hungarian numbers to +36 XX XXX XXXX format.
 */
export function formatPhoneDisplay(phone: string): string {
  if (!phone) return '';

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');

  // Normalize to digits with proper country code
  let normalizedDigits: string;

  if (trimmed.startsWith('+')) {
    // +36... → digits already without '+'
    normalizedDigits = digits;
  } else if (digits.startsWith('0036')) {
    // 0036... → 36...
    normalizedDigits = digits.slice(2);
  } else if (digits.startsWith('06')) {
    // 06... → 36...
    normalizedDigits = '36' + digits.slice(2);
  } else {
    normalizedDigits = digits;
  }

  // Hungarian number: +36 + 9 digits = 11 digits total
  if (normalizedDigits.startsWith('36') && normalizedDigits.length === 11) {
    const areaCode = normalizedDigits.slice(2, 4);
    const part1 = normalizedDigits.slice(4, 7);
    const part2 = normalizedDigits.slice(7, 11);
    return `+36 ${areaCode} ${part1} ${part2}`;
  }

  return trimmed;
}

export function validatePhoneNumber(phone: string): boolean {
  // Elfogad bármilyen telefonszámot ami tartalmaz legalább néhány számjegyet
  const cleaned = phone.replace(/[^\d]/g, '');
  
  // Minimum 5 számjegy kell (nagyon engedékeny)
  return cleaned.length >= 5;
}
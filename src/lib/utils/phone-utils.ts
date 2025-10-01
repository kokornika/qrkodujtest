export function normalizePhoneNumber(phone: string): string {
  // Csak visszaadjuk az eredeti telefonszámot minimális tisztítással
  // Megtartjuk a +, számjegyek, szóközök, kötőjelek karaktereket
  return phone.trim();
}

function formatPhoneNumber(phone: string): string {
  // Egyszerűen visszaadjuk a telefonszámot
  return phone.trim();
}

export function validatePhoneNumber(phone: string): boolean {
  // Elfogad bármilyen telefonszámot ami tartalmaz legalább néhány számjegyet
  const cleaned = phone.replace(/[^\d]/g, '');
  
  // Minimum 5 számjegy kell (nagyon engedékeny)
  return cleaned.length >= 5;
}
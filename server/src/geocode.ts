import ngeohash from 'ngeohash';

export function encode(lat: number, lng: number, precision = 12): string {
  return ngeohash.encode(lat, lng, precision);
}

export function decode(hash: string): { lat: number; lng: number } {
  const { latitude, longitude } = ngeohash.decode(hash);
  return { lat: latitude, lng: longitude };
}

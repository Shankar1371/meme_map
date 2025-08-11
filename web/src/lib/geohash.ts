import ngeohash from 'ngeohash';

export const encode = (lat: number, lng: number, precision = 12) => ngeohash.encode(lat, lng, precision);
export const decode = (hash: string) => {
  const { latitude, longitude } = ngeohash.decode(hash);
  return { lat: latitude, lng: longitude };
};

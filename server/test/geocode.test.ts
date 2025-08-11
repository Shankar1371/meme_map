import { describe, expect, it } from 'vitest';
import { encode, decode } from '../src/geocode';

describe('geohash utils', () => {
  it('encode/decode roundtrip', () => {
    const hash = encode(40.6892, -74.0445, 6);
    const { lat, lng } = decode(hash);
    expect(Math.abs(lat - 40.6892)).toBeLessThan(0.01);
    expect(Math.abs(lng + 74.0445)).toBeLessThan(0.01);
  });
});

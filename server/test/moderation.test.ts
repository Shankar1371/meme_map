import { describe, expect, it } from 'vitest';
import { nsfwCheck, toxicityCheck } from '../src/moderation';

describe('moderation stubs', () => {
  it('returns clean for nsfwCheck', async () => {
    expect(await nsfwCheck(Buffer.from(''))).toBe('clean');
  });
  it('returns clean for toxicityCheck', async () => {
    expect(await toxicityCheck('hello')).toBe('clean');
  });
});

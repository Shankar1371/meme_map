import { describe, expect, it } from 'vitest';
import { computeScore } from '../src/ranking';

describe('computeScore', () => {
  it('applies time decay', () => {
    const now = new Date();
    const score = computeScore({ upvotes: 10, downvotes: 2, commentCount: 4, createdAt: new Date(now.getTime() - 3600000) });
    expect(score).toBeCloseTo(10 - 2 + 0.5 * 4 - 0.1);
  });
});

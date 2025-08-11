export interface MemeScoreInput {
  upvotes: number;
  downvotes: number;
  commentCount: number;
  createdAt: Date;
}

export function computeScore(meme: MemeScoreInput): number {
  const votes = meme.upvotes - meme.downvotes;
  const hours = Math.floor((Date.now() - meme.createdAt.getTime()) / 3600000);
  const decay = hours * 0.1;
  return votes + 0.5 * meme.commentCount - decay;
}

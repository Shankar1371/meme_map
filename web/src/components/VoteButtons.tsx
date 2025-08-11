import { useState } from 'react';
import { voteMeme } from '../lib/api';

export default function VoteButtons({ memeId, score }: { memeId: string; score: number }) {
  const [current, setCurrent] = useState(score);
  const send = async (value: number) => {
    const res = await voteMeme(memeId, value);
    setCurrent(res.score);
  };
  return (
    <span>
      <button onClick={() => send(1)}>▲</button>
      {current}
      <button onClick={() => send(-1)}>▼</button>
    </span>
  );
}

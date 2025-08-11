import { useState } from 'react';

const modes = ['nearby', 'new', 'today'] as const;

export default function FeedTabs() {
  const [mode, setMode] = useState<typeof modes[number]>('nearby');
  return (
    <div className="feed-tabs">
      {modes.map(m => (
        <button key={m} onClick={() => setMode(m)} disabled={mode===m}>{m}</button>
      ))}
    </div>
  );
}

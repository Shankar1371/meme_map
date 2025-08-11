import { useEffect, useState } from 'react';
import MapView from '../components/MapView';
import MemeCard from '../components/MemeCard';
import FeedTabs from '../components/FeedTabs';
import { fetchMemes } from '../lib/api';

export default function MapPage() {
  const [memes, setMemes] = useState<any[]>([]);
  useEffect(() => {
    fetchMemes().then(setMemes).catch(console.error);
  }, []);
  return (
    <div className="map-page">
      <MapView memes={memes} />
      <div className="feed">
        <FeedTabs />
        {memes.map((m) => (
          <MemeCard key={m.id} meme={m} />
        ))}
      </div>
    </div>
  );
}

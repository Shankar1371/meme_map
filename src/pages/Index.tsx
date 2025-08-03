import React, { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import MemeCard from '@/components/MemeCard';
import TokenInput from '@/components/TokenInput';

const Index = () => {
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
    localStorage.setItem('mapbox_token', token);
  };

  const handleLocationClick = (location: any) => {
    setSelectedLocation(location);
  };

  const handleCloseCard = () => {
    setSelectedLocation(null);
  };

  // Check for stored token on component mount
  React.useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

  if (!mapboxToken) {
    return <TokenInput onTokenSubmit={handleTokenSubmit} />;
  }

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      <MapComponent 
        mapboxToken={mapboxToken}
        onLocationClick={handleLocationClick}
      />
      
      {selectedLocation && (
        <MemeCard 
          location={selectedLocation}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
};

export default Index;

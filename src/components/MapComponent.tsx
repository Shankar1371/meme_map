import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface MapProps {
  onLocationClick: (location: any) => void;
  mapboxToken: string;
}

const MapComponent = ({ onLocationClick, mapboxToken }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      zoom: 2,
      center: [-98, 39], // Center of US
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add some demo locations with markers
    const demoLocations = [
      { lng: -118.2437, lat: 34.0522, name: 'Los Angeles', zip: '90210' },
      { lng: -74.0059, lat: 40.7128, name: 'New York', zip: '10001' },
      { lng: -87.6298, lat: 41.8781, name: 'Chicago', zip: '60601' },
      { lng: -97.7431, lat: 30.2672, name: 'Austin', zip: '78704' },
      { lng: -122.4194, lat: 37.7749, name: 'San Francisco', zip: '94102' },
    ];

    demoLocations.forEach(location => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = `
        <div class="w-4 h-4 bg-gradient-electric rounded-full shadow-glow-electric animate-glow-pulse cursor-pointer border-2 border-background hover:scale-110 transition-transform"></div>
      `;
      
      el.addEventListener('click', () => {
        onLocationClick({
          ...location,
          rent: Math.floor(Math.random() * 3000) + 1000,
          crime: Math.floor(Math.random() * 100) + 1,
          weather: Math.floor(Math.random() * 50) + 30,
        });
      });

      new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current!);
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationClick]);

  const handleSearch = () => {
    if (!searchValue || !map.current) return;
    
    // Simple geocoding simulation
    const commonPlaces: { [key: string]: [number, number] } = {
      'manhattan': [-73.9857, 40.7484],
      'brooklyn': [-73.9442, 40.6782],
      'chicago': [-87.6298, 41.8781],
      'austin': [-97.7431, 30.2672],
      'sf': [-122.4194, 37.7749],
      'la': [-118.2437, 34.0522],
    };

    const coords = commonPlaces[searchValue.toLowerCase()];
    if (coords) {
      map.current.flyTo({
        center: coords,
        zoom: 12,
        duration: 2000
      });
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 max-w-sm w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search ZIP code or city..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10 bg-card/90 backdrop-blur-sm border-electric/30 focus:border-electric focus:shadow-glow-electric"
          />
        </div>
        <Button 
          onClick={handleSearch}
          size="icon"
          className="bg-gradient-electric hover:shadow-glow-electric transition-all duration-300"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-overlay" />
    </div>
  );
};

export default MapComponent;
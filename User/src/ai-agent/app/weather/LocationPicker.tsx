'use client';

import { useEffect, useRef, useState } from 'react';

interface LocationPickerProps {
  onLocationSelect: (location: string, coordinates?: { lat: number; lng: number }) => void;
  apiKey: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function LocationPicker({ onLocationSelect, apiKey }: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  const loadGoogleMaps = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20.5937, lng: 78.9629 }, // India center
      zoom: 5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true,
    });

    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('location-input') as HTMLInputElement,
      {
        types: ['(cities)'],
        componentRestrictions: { country: 'in' }
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        mapInstance.setCenter(location);
        mapInstance.setZoom(10);
        markerInstance.setPosition(location);
        
        const locationName = place.name || place.formatted_address || '';
        setSelectedLocation(locationName);
        onLocationSelect(locationName, {
          lat: location.lat(),
          lng: location.lng()
        });
      }
    });

    mapInstance.addListener('click', (event: any) => {
      const clickedLocation = event.latLng;
      markerInstance.setPosition(clickedLocation);
      
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: clickedLocation }, (results: any[], status: string) => {
        if (status === 'OK' && results[0]) {
          const locationName = results[0].formatted_address;
          setSelectedLocation(locationName);
          onLocationSelect(locationName, {
            lat: clickedLocation.lat(),
            lng: clickedLocation.lng()
          });
        }
      });
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Location</h3>
      
      <div className="mb-4">
        <input
          id="location-input"
          type="text"
          placeholder="Search for your city..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
        />
      </div>
      
      <div 
        ref={mapRef}
        className="w-full h-64 rounded-lg border border-gray-200 mb-4"
      ></div>
      
      {selectedLocation && (
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <div className="w-5 h-5 flex items-center justify-center mr-3">
            <i className="ri-map-pin-line text-green-600"></i>
          </div>
          <span className="text-green-800 font-medium">{selectedLocation}</span>
        </div>
      )}
    </div>
  );
}
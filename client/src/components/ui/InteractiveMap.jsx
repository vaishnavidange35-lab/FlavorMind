import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for highlighted marker
const highlightIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const InteractiveMap = ({ restaurants, hoveredId, onMarkerClick, defaultCenter }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  // 1. Initialize Map
  useEffect(() => {
    if (!mapRef.current) return;
    
    if (!mapInstance.current) {
      const center = defaultCenter || (restaurants.length > 0 ? restaurants[0].coords : { lat: 19.0760, lng: 72.8777 });
      
      mapInstance.current = L.map(mapRef.current, {
        center: [center.lat, center.lng],
        zoom: 13,
        zoomControl: false // Add if you want to reposition
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        className: 'map-tiles'
      }).addTo(mapInstance.current);
      
      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
    }
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount

  // 2. Fly to center when defaultCenter changes
  useEffect(() => {
    if (mapInstance.current && defaultCenter) {
      mapInstance.current.flyTo([defaultCenter.lat, defaultCenter.lng], 13, {
        animate: true,
        duration: 1.5
      });
    }
  }, [defaultCenter]);

  // 3. Create Markers
  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    restaurants.forEach(rest => {
      const marker = L.marker([rest.coords.lat, rest.coords.lng], {
        icon: new L.Icon.Default()
      }).addTo(mapInstance.current);

      // Bind a popup
      const popupContent = `
        <div class="flex flex-col gap-1 min-w-[200px]" style="font-family: inherit;">
          <img src="${rest.image}" alt="${rest.name}" style="width: 100%; height: 96px; object-fit: cover; border-top-left-radius: 8px; border-top-right-radius: 8px; margin-top: -16px; margin-left: -20px; max-width: calc(100% + 40px); margin-bottom: 8px;" />
          <h3 style="font-weight: bold; font-size: 16px; margin: 0; line-height: 1.2;">${rest.name}</h3>
          <p style="font-size: 12px; color: #64748b; margin: 0;">${rest.cuisine} • ⭐ ${rest.rating}</p>
          <div style="margin-top: 8px; font-size: 12px;">
            <span style="font-weight: 600; color: #059669;">Top Dish:</span> ${rest.currentRecommendedDish?.name || rest.popularDishes[0]?.name}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'rounded-xl overflow-hidden'
      });

      marker.on('click', () => {
        if (onMarkerClick) onMarkerClick(rest.id);
      });

      markersRef.current[rest.id] = marker;
    });
  }, [restaurants, onMarkerClick]);

  // 4. Update Hovered Marker Icon
  useEffect(() => {
    if (!mapInstance.current) return;

    Object.keys(markersRef.current).forEach(id => {
      const marker = markersRef.current[id];
      if (id === hoveredId) {
        marker.setIcon(highlightIcon);
        marker.setZIndexOffset(1000);
      } else {
        marker.setIcon(new L.Icon.Default());
        marker.setZIndexOffset(0);
      }
    });
  }, [hoveredId]);

  return (
    <div 
      ref={mapRef} 
      style={{ height: '100%', width: '100%', borderRadius: '1.5rem', zIndex: 0 }}
      className="interactive-map-container"
    />
  );
};

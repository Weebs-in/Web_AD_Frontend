import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const MapComponent = ({ collectionPoints }) => {
  const [markersAndListenersReady, setMarkersAndListenersReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (collectionPoints.length > 0) {
      console.log('collectionPoints changed, initializing map...');
      setMarkersAndListenersReady(true);
      if (markersAndListenersReady) {
        console.log('setMarkersAndListenersReady to true');
      }
    }
    // eslint-disable-next-line
  }, [collectionPoints]);

  useEffect(() => {
    if (markersAndListenersReady) {
      console.log('reinitialise map if markersAndListenersReady');
      initMap();
      setMarkersAndListenersReady(false);
    }
    // eslint-disable-next-line
  }, [markersAndListenersReady]); // do not listen to eslint and put initMap here because it cannot be called before initialisation

  const initMap = async () => {
    console.log('Maps JavaScript API loaded.');

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 1.3785214720052124, lng: 103.81470319776338 },
      zoom: 11
    });

    // Create a Geocoder instance
    console.log('Geocoder instance created');
    const geocoder = new window.google.maps.Geocoder();

    // Map collection points to markers
    console.log('Mapping collection points to markers');
    for (const point of collectionPoints) {
      // Use Promise to ensure synchronous geocoding
      await new Promise((resolve) => {
        // Geocode the address to get latitude and longitude
        geocoder.geocode({ address: point.address }, (results, status) => {
          if (status === 'OK') {
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              title: point.name,
              map: map
            });

            // Add click event listener to each marker
            marker.addListener('click', () => {
              const infoWindow = new window.google.maps.InfoWindow({
                content: point.name
              });
              infoWindow.open(map, marker);
            });
          } else {
            console.error('Geocode error:', status);
          }
          resolve(); // Resolve the Promise after geocoding
        });
      });
    }
  };

  return <div id="map" style={{ minHeight: '400px', height: 'auto', minWidth: '500px', maxWidth: '100%', width: '100%' }}></div>;
};

export default MapComponent;

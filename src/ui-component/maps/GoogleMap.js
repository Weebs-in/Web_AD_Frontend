import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    // This function is called when the component is mounted
    initMap();
  }, []);

  const initMap = () => {
    console.log('Maps JavaScript API loaded.');

    // Create a new map instance
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 1.3785214720052124, lng: 103.81470319776338 },
      zoom: 11
    });

    // Create markers for your locations
    const marker1 = new window.google.maps.Marker({
      position: { lat: 1.2924497513679765, lng: 103.77653562182284 },
      title: 'ISS',
      map: map
    });

    const marker2 = new window.google.maps.Marker({
      position: { lat: 47.648994, lng: -122.3503845 },
      title: 'Seattle, WA',
      map: map
    });

    // Add click event listeners to the markers
    marker1.addListener('click', () => {
      const infoWindow = new window.google.maps.InfoWindow({
        content: 'ISS'
      });
      infoWindow.open(map, marker1);
    });

    marker2.addListener('click', () => {
      const infoWindow = new window.google.maps.InfoWindow({
        content: 'Seattle, WA'
      });
      infoWindow.open(map, marker2);
    });
  };

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;

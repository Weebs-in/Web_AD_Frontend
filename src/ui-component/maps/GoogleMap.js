import React, { useState, useEffect } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const MapComponent = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [markersAndListenersReady, setMarkersAndListenersReady] = useState(false);

  useEffect(() => {
    fetchCollectionPoints();
    initMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (collectionPoints.length > 0 && markersAndListenersReady) {
      initMap();
    }
  }, [collectionPoints, markersAndListenersReady]);

  const fetchCollectionPoints = async () => {
    try {
      const response = await fetch(config.collectionPoint, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Retrieved collection point data successfully');
        console.log(data);
        setCollectionPoints(data);
        setMarkersAndListenersReady(true);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching collection point data:', error);
    }
  };

  const initMap = () => {
    console.log('Maps JavaScript API loaded.');

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 1.3785214720052124, lng: 103.81470319776338 },
      zoom: 11
    });

    // Create a Geocoder instance
    const geocoder = new window.google.maps.Geocoder();

    // Map collection points to markers
    collectionPoints.forEach((point) => {
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
      });
    });
  };

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;

// import React, { useEffect } from 'react';
//
// const MapComponent = () => {
//   useEffect(() => {
//     // This function is called when the component is mounted
//     initMap();
//   }, []);
//
//   const initMap = () => {
//     console.log('Maps JavaScript API loaded.');
//
//     // Create a new map instance
//     const map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: 1.3785214720052124, lng: 103.81470319776338 },
//       zoom: 11
//     });
//
//     // Create markers for your locations
//     const marker1 = new window.google.maps.Marker({
//       position: { lat: 1.2924497513679765, lng: 103.77653562182284 },
//       title: 'ISS',
//       map: map
//     });
//
//     const marker2 = new window.google.maps.Marker({
//       position: { lat: 47.648994, lng: -122.3503845 },
//       title: 'Seattle, WA',
//       map: map
//     });
//
//     // Add click event listeners to the markers
//     marker1.addListener('click', () => {
//       const infoWindow = new window.google.maps.InfoWindow({
//         content: 'ISS'
//       });
//       infoWindow.open(map, marker1);
//     });
//
//     marker2.addListener('click', () => {
//       const infoWindow = new window.google.maps.InfoWindow({
//         content: 'Seattle, WA'
//       });
//       infoWindow.open(map, marker2);
//     });
//   };
//
//   return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
// };
//
// export default MapComponent;

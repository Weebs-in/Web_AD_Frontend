// GoogleMapsLoader.js

// Promisified function to load a script dynamically
const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Load Google Maps API script
export const loadGoogleMapsAPI = () => {
  const apiKey = 'AIzaSyDSpewPKb5AMUQsZ732e3Co8HQkUUsuGv0'; // Replace with your API key
  const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  return loadScript(url);
};

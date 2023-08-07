import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { loadGoogleMapsAPI } from './ui-component/maps/GoogleMapsLoader';
import { useEffect } from 'react';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  useEffect(() => {
    // Load Google Maps API before rendering the app
    loadGoogleMapsAPI()
      .then(() => {
        console.log('Google Maps API loaded');
      })
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });
  }, []);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

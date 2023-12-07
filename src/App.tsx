import { ThemeProvider } from 'styled-components';
import { mainTheme } from './assets/styles/themes/main';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { LoadScript } from '@react-google-maps/api';
import { libs } from './utils/libsGoogle';
import { SplashScreen } from './view/components/SplashScreen';

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          libraries={libs}
          loadingElement={<SplashScreen />}
          region="BR"
        >
          <GlobalStyle />
          <Router />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: mainTheme.colors.black[100],
                color: mainTheme.colors.white[400],
              },
            }}
          />
        </LoadScript>
      </AuthProvider>
    </ThemeProvider>
  );
}

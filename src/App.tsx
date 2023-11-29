import { ThemeProvider } from 'styled-components';
import { mainTheme } from './assets/styles/themes/main';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { LoadScript } from '@react-google-maps/api';
import { libs } from './utils/libsGoogle';
import { Loader } from './view/components/Loader';

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          libraries={libs}
          loadingElement={<Loader visible />}
          region="BR"
        >
          <GlobalStyle />
          <Router />
          <Toaster
            position="top-right"
            toastOptions={{
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

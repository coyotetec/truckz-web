import { ThemeProvider } from 'styled-components';
import { mainTheme } from './assets/styles/themes/main';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
}

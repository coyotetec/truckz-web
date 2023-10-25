import { ThemeProvider } from 'styled-components';
import { mainTheme } from './assets/styles/themes/main';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <AuthProvider>
        <GlobalStyle />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

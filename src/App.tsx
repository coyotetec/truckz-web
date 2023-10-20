import { ThemeProvider } from 'styled-components';
import { mainTheme } from './assets/styles/themes/main';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { Router } from './Router';

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

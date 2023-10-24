import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Manrope, sans-serif;
  }

  body {
    background: ${({ theme }) => theme.colors.black[400]};
    color: ${({ theme }) => theme.colors.white[400]};
    font-size: 16px;
    line-height: 140%;
  }

  html, body, #root {
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white[100]};
  }

  h1, h2, h3, h4, h5 {
    color: ${({ theme }) => theme.colors.white[100]};
    font-weight: 700;
    line-height: 110%;
  }

  h1 {
    font-size: 40px;
    letter-spacing: -0.4px;
  }

  h2 {
    font-size: 32px;
    letter-spacing: -0.32px;
  }

  h3 {
    font-size: 28px;
    letter-spacing: -0.28px;
  }

  h4 {
    font-size: 24px;
    letter-spacing: -0.24px;
  }

  h5 {
    font-size: 20px;
    letter-spacing: -0.2px;
  }
`;

import { DefaultTheme } from 'styled-components';

export const mainTheme: DefaultTheme = {
  colors: {
    primary: {
      100: '#D4E3D6',
      200: '#9ABDA0',
      300: '#609869',
      400: '#267233',
      500: '#205F2B',
      600: '#194C22',
      700: '#13391A',
    },
    black: {
      50: '#545754',
      100: '#454745',
      200: '#3B3D3B',
      300: '#313331',
      400: '#282928',
      500: '#1E1F1E',
      600: '#141414',
      700: '#0A0A0A',
    },
    white: {
      100: '#FFFFFF',
      200: '#EDF0ED',
      300: '#DBE0DB',
      400: '#CDD1CD',
      500: '#BEC2BE',
      600: '#AFB2AF',
      700: '#A0A3A0',
      800: '#7D807D',
    },
    complementary: {
      red: {
        100: '#FBCAC9',
        500: '#F03C37',
        800: '#95211E',
      },
      yellow: {
        100: '#FFF2C0',
        500: '#F5C918',
        800: '#D5AE13',
      },
      green: {
        100: '#D1ECD1',
        500: '#56B855',
        800: '#327131',
      },
    },
    modal: {
      overlay: 'rgba(10, 10, 10, 0.8)',
    },
  },
};

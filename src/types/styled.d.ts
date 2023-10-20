import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
      };
      black: {
        '50': string;
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
      };
      white: {
        '100': string;
        '200': string;
        '300': string;
        '400': string;
        '500': string;
        '600': string;
        '700': string;
        '800': string;
      };
      complementary: {
        red: {
          '100': string;
          '500': string;
          '800': string;
        };
        yellow: {
          '100': string;
          '500': string;
          '800': string;
        };
        green: {
          '100': string;
          '500': string;
          '800': string;
        };
      };
      modal: {
        overlay: string;
      };
    };
  }
}

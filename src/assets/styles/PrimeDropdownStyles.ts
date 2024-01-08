import { createGlobalStyle } from 'styled-components';

export const PrimeDropdownStyles = createGlobalStyle`
  .p-dropdown-panel {
    background: ${({ theme }) => theme.colors.black[300]};
    border-radius: 8px;
    overflow: hidden;
    box-shadow:
              /* shadow ring 👇 */
              0 0 0 1px hsla(0, 0%, 0%, 0.05),
              /* multiple soft shadows 👇 */
              0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
              0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
              0 3.5px 6px hsla(0, 0%, 0%, 0.09);

    .p-dropdown-items-wrapper {
      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.black[200]};
      }

      &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.white[800]};
        border-radius: 999px;
      }

      .p-dropdown-items {
        .p-dropdown-item {
          padding: 6px 8px;
          font-size: 14px;

          &:hover {
            background: ${({ theme }) => theme.colors.black[200]};
          }

          &.p-highlight {
            background: ${({ theme }) => theme.colors.black[100]};
          }
        }

        .p-dropdown-empty-message {
          font-size: 14px;
          text-align: center;
          color: ${({ theme }) => theme.colors.white[800]};
          padding: 16px 0;
        }
      }
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.nav`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black[600]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 20rem;

  div {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;

    .logo {
      margin: 2.5rem 0;
    }

    hr {
      border: ${({ theme }) => `1px solid ${theme.colors.black[100]}`};
      margin: 0.5rem 0;
      width: 85%;
    }
  }
`;

interface ButtonProps {
  action?: 'exit';
}

export const Button = styled.button<ButtonProps>`
  align-items: center;
  background-color: ${({ action, theme }) =>
    action === 'exit' ? theme.colors.black[400] : theme.colors.black[600]};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white[400]};
  display: flex;
  height: 3rem;
  justify-content: ${({ action }) => action === 'exit' && 'center'};
  margin-bottom: 0.75rem;
  width: 17.5rem;

  svg {
    margin: 0 12px 0 16px;
  }

  &:focus,
  &:active {
    background-color: ${({ action, theme }) =>
      action === 'exit'
        ? `${theme.colors.complementary.red[500]}`
        : `${theme.colors.primary[400]}`};
    color: ${({ theme }) => theme.colors.white[100]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white[100]};
  }
`;

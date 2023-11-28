import styled, { css } from 'styled-components';

interface ContainerProps {
  readonly secondary?: boolean;
  readonly danger?: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 52px;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: ${({ theme }) => theme.colors.white[100]};
  background: ${({ theme }) => theme.colors.primary[400]};
  border-radius: 8px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ theme, secondary }) =>
    secondary &&
    css`
      background: ${theme.colors.black[200]};
    `}

  ${({ theme, danger }) =>
    danger &&
    css`
      background: ${theme.colors.complementary.red[500]};
    `}

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

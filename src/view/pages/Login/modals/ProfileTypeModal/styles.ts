import styled from 'styled-components';

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white[500]};
    background: ${({ theme }) => theme.colors.black[200]};
    border-radius: 8px;
    border: none;
    margin-top: 16px;

    & + button {
      margin-top: 8px;
    }
  }
`;

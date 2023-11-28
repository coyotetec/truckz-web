import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 14px;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  .actions {
    display: flex;
    gap: 8px;
    margin: 32px auto 0;

    button {
      width: 160px;
    }
  }
`;

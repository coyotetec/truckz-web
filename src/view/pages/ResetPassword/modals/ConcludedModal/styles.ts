import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h5 {
    font-weight: 600;
  }

  p {
    max-width: 480px;
    font-size: 14px;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  button {
    margin-top: 16px;
  }
`;

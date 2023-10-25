import styled from 'styled-components';

export const Container = styled.section`
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.black[50]};
  background: ${({ theme }) => theme.colors.black[300]};
  height: 80px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white[800]};
  }
`;

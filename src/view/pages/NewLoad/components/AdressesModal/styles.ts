import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  h5 {
    margin-bottom: 0.75rem;
  }

  svg {
    position: absolute;
    top: -12px;
    right: -10px;
  }
`;

export const Address = styled.div`
  background-color: ${({ theme }) => theme.colors.black[300]};
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.25rem;
  cursor: pointer;

  h5 {
    color: ${({ theme }) => theme.colors.white[400]};
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0;
  }

  small {
    color: ${({ theme }) => theme.colors.white[400]};
    font-size: 0.75rem;
    font-weight: 400;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white[400]};
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
  }
`;

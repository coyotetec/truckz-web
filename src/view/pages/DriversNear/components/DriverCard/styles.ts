import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 20.25rem;
  padding: 1rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.black[200]};
  border-radius: 8px;
  position: relative;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 999px;
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.white[700]};
    position: absolute;
    top: 4px;
    right: 8px;
  }

  div {
    h4 {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.white[400]};
    }

    span {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.white[400]};
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    background-color: ${({ theme }) => theme.colors.primary[400]};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white[100]};
    position: absolute;
    bottom: 8px;
    right: 8px;

    img {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:active {
      opacity: 0.8;
    }
  }
`;

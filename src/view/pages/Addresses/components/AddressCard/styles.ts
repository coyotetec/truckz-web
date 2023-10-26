import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.black[200]};
  border-radius: 8px;
  padding: 1rem;
  width: 496px;
  position: relative;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;

    h4 {
      margin-right: 0.25rem;
      font-size: 1.25rem;
      color: ${({ theme }) => theme.colors.white[100]};
    }
  }

  small {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white[700]};
    line-height: normal;
  }

  button {
    background-color: ${({ theme }) => theme.colors.white[800]};
    border-radius: 4px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.white[400]};
    padding: 0.25rem;
    height: 1.75rem;
    width: 1.75rem;

    position: absolute;
    right: 8px;
    bottom: 8px;

    &:active {
      opacity: 0.8;
    }
  }
`;

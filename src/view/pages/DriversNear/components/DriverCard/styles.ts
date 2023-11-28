import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
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
    text-align: right;
    color: ${({ theme }) => theme.colors.white[700]};
    position: absolute;
    top: 4px;
    right: 8px;
  }

  div {
    span {
      display: block;
      font-size: 0.8rem;
    }
  }

  a {
    display: flex;
    padding: 0.25rem;
    background-color: ${({ theme }) => theme.colors.primary[400]};
    outline: none;
    border: none;
    border-radius: 4px;
    position: absolute;
    bottom: 8px;
    right: 8px;

    &:active {
      opacity: 0.8;
    }
  }
`;

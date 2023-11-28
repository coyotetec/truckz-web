import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black[200]};
  padding: 1rem;
  border-radius: 8px;
  position: relative;

  header {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    margin-bottom: 0.25rem;

    span {
      font-weight: 600;
    }
  }

  strong {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.white[700]};
    line-height: 145%;
  }

  .actions {
    display: flex;
    gap: 8px;
    position: absolute;
    right: 8px;
    bottom: 8px;
  }

  button {
    display: flex;
    padding: 0.25rem;
    background: ${({ theme }) => theme.colors.white[800]};
    outline: none;
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white[400]};

    &.delete {
      background: ${({ theme }) => theme.colors.complementary.red[500]};
    }

    &:active {
      opacity: 0.8;
    }
  }
`;

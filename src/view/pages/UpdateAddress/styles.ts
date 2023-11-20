import styled from 'styled-components';

export const Container = styled.main`
  padding: 3rem 2.5rem;
  margin: 0 auto;
  max-width: 1092px;
  > header {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.white[100]};
    }

    h1 {
      margin-bottom: 0.25rem;
    }

    p {
      color: ${({ theme }) => theme.colors.white[700]};
    }
  }

  button {
    margin: 0 auto;
    margin-top: 3rem;
    width: 31rem;
  }
`;

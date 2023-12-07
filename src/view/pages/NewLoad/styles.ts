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

    p {
      margin-top: 0.25rem;
      color: ${({ theme }) => theme.colors.white[700]};
    }
  }

  > button {
    width: 100%;
    max-width: 496px;
    margin: auto auto 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin: 1.5rem 0 2.5rem;
`;

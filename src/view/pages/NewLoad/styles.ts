import styled from 'styled-components';

export const Container = styled.main`
  padding: 3rem 2.5rem;
  margin: 0 auto;
  max-width: 1092px;

  > header {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      margin-bottom: 0.25rem;
    }
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  gap: 1.25rem;
  max-width: 1012px;
  padding-top: 1.5rem;
`;

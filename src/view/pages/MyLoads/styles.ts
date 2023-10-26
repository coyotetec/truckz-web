import styled from 'styled-components';

export const Container = styled.main`
  padding: 3rem 2.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1012px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  button {
    padding: 0 2rem;
  }
`;

export const LoadsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.5rem;
  width: 100%;
`;

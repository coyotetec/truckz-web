import styled from 'styled-components';

export const Container = styled.main`
  margin-left: 20rem;
  padding: 3rem 2.5rem;
  width: 70%;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1012px;

  .head {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  h1 {
    margin-bottom: 0.25rem;
  }
`;

export const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[400]};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white[100]};
  display: flex;
  height: 3.25rem;
  justify-content: center;
  text-decoration: none;
  width: 11.1875rem;
`;

export const LoadsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 1.5rem;
  width: 100%;
`;

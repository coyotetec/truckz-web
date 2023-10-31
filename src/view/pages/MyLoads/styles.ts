import styled from 'styled-components';

export const Container = styled.main`
  padding: 3rem 2.5rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1012px;

  .head {
    display: flex;
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
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[400]};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white[100]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

import styled from 'styled-components';

export const Container = styled.main`
  padding: 48px 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.white[700]};
  }
`;

export const DriversContainer = styled.div`
  padding-top: 1.6875rem;
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  max-width: 1012px;
`;

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
    justify-content: space-between;
    align-items: center;

    h1 {
      margin-bottom: 4px;
      font-size: 2.5rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.white[100]};
    }

    p {
      font-size: 1rem;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.white[700]};
    }
  }

  button {
    padding: 0 2rem;
  }
`;

export const AddressesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  padding-top: 1.5rem;
`;

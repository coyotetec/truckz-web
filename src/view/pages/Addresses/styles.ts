import styled from 'styled-components';

export const Container = styled.main`
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1092px;
  margin: 0 auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    p {
      margin-top: 0.25rem;
      color: ${({ theme }) => theme.colors.white[700]};
    }
  }
`;

export const AddressesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
  width: 100%;
`;

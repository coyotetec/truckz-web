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
  }

  button {
    margin: 0 auto;
    margin-top: 3rem;
    width: 31rem;
  }
`;

export const FormAddress = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 3.6rem;
  max-width: 31rem;

  .number-district,
  .state-city {
    display: flex;
    gap: 0.5rem;
  }

  .error {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.complementary.red[500]};
  }
`;

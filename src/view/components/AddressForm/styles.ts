import styled from 'styled-components';

export const FormAddress = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1.5rem 0 2.5rem;
  max-width: calc(1092px / 2 - 1.25rem);

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

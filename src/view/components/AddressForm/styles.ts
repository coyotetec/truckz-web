import styled from 'styled-components';

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

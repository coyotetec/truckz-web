import styled from 'styled-components';

export const Container = styled.main`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  p {
    color: ${({ theme }) => theme.colors.white[700]};
    margin-top: 4px;
  }

  form {
    width: 100%;
    max-width: 496px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0 40px;
  }

  > button {
    width: 100%;
    max-width: 496px;
    margin: auto auto 0;
  }
`;

import styled from 'styled-components';

export const Wrapper = styled.div`
  label {
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.white[600]};
  }

  .error {
    font-size: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.complementary.red[500]};
  }
`;

export const Container = styled.div`
  height: 52px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.black[200]};
  padding: 0 16px;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  gap: 8px;

  input {
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white[400]};

    &::placeholder {
      color: ${({ theme }) => theme.colors.white[800]};
      opacity: 1;
    }

    &::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors.white[800]};
    }
  }

  button {
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    align-self: center;
  }
`;

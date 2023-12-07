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

export const Container = styled.textarea`
  background-color: ${({ theme }) => theme.colors.black[200]};
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 1rem;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 0.875rem 1rem;
  height: 6.5rem;
  display: block;
  width: 100%;
  margin-top: 4px;
  resize: none;
`;

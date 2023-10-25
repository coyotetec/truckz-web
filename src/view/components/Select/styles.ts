import styled from 'styled-components';

export const Wrapper = styled.div`
  label {
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.white[600]};
  }
`;

export const Container = styled.div`
  height: 52px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.black[200]};
  margin-top: 4px;
  position: relative;

  select {
    height: 100%;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-family: Manrope, sans-serif;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white[400]};
    padding: 0 14px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
`;

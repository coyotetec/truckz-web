import styled from 'styled-components';

export const Wrapper = styled.div`
  label {
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.white[600]};
  }

  .p-dropdown {
    height: 52px;
    width: 100%;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.black[200]};
    outline: none;
    padding: 0 14px;
    align-items: center;
  }
`;

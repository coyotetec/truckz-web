import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: 12px;

  small {
    font-size: 12px;
    line-height: normal;
    text-align: center;
    color: ${({ theme }) => theme.colors.white[700]};
    background: ${({ theme }) => theme.colors.black[400]};
    z-index: 4;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 8px;
  }

  .line {
    background: ${({ theme }) => theme.colors.white[700]};
    height: 1px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50);
  }
`;

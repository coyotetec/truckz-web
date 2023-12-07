import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.black[600]};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

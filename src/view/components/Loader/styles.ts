import styled from 'styled-components';

export const Overlay = styled.div`
  background: ${({ theme }) => theme.colors.modal.overlay};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

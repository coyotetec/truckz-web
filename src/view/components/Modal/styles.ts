import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const Overlay = styled.div`
  background: ${({ theme }) => theme.colors.modal.overlay};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Container = styled.div`
  min-width: 480px;
  max-width: 780px;
  background: ${({ theme }) => theme.colors.black[400]};
  z-index: 101;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 1px hsla(0, 0%, 0%, 0.14);
  position: relative;
  overflow: hidden;

  .close-button {
    display: flex;
    background: transparent;
    border: none;
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 999;
  }

  @media (max-width: 1023px) {
    min-width: initial;
    width: 100%;
    margin: 0 20px;
  }
`;

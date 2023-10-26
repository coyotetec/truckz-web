import React from 'react';
import { Container, Overlay, Wrapper } from './styles';
import { X } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { ReactPortal } from '../ReactPortal';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
}

export function Modal({ children, visible, onClose }: ModalProps) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <ReactPortal wrapperId="modal-root">
      <Wrapper>
        <Overlay onClick={onClose} />
        <Container>
          {onClose && (
            <button type="button" className="close-button" onClick={onClose}>
              <X size={24} color={theme.colors.white[700]} weight="bold" />
            </button>
          )}
          {children}
        </Container>
      </Wrapper>
    </ReactPortal>
  );
}

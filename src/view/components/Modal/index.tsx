import React from 'react';
import { Container, Overlay, Wrapper } from './styles';
import { X } from '@phosphor-icons/react';
import { useTheme } from 'styled-components';
import { ReactPortal } from '../ReactPortal';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
  closeIconColor?: string;
}

export function Modal({
  children,
  visible,
  onClose,
  style,
  closeIconColor,
}: ModalProps) {
  const theme = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <ReactPortal wrapperId="modal-root">
      <Wrapper>
        <Overlay onClick={onClose} />
        <Container style={style}>
          {onClose && (
            <button type="button" className="close-button" onClick={onClose}>
              <X
                size={24}
                color={closeIconColor || theme.colors.white[700]}
                weight="bold"
              />
            </button>
          )}
          {children}
        </Container>
      </Wrapper>
    </ReactPortal>
  );
}

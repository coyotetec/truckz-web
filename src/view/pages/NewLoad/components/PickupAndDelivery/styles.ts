import styled from 'styled-components';

export const PickupAndDeliveryContainer = styled.div`
  max-width: 496px;
  width: 100%;

  form {
    padding-top: 1rem;

    .container-buttons {
      padding: 0.5rem 0 0.25rem;
      display: flex;
      gap: 0.5rem;
    }
  }

  small {
    display: block;
    padding: 12px 0 4px;
  }
`;

interface ButtonAddressProps {
  isActive?: boolean;
}

export const ButtonAddress = styled.button<ButtonAddressProps>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary[400] : theme.colors.black[50]};
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  height: 2.75rem;
  width: 15.25rem;
`;

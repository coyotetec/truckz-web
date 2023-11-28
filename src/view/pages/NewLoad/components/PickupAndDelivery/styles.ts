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

  .label-map {
    display: block;
    padding: 12px 0 4px;
    font-weight: 600;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.white[600]};
  }
`;

export const Address = styled.div`
  background-color: ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  position: relative;
  margin: 0.5rem 0;

  h5 {
    color: ${({ theme }) => theme.colors.white[400]};
    font-weight: 600;
    font-size: 1rem;
  }

  small {
    color: ${({ theme }) => theme.colors.white[800]};
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white[400]};
  }

  svg {
    position: absolute;
    top: 2rem;
    right: 0.75rem;
    cursor: pointer;
  }
`;

interface ButtonAddressProps {
  isActive?: boolean;
}

export const ButtonAddress = styled.button<ButtonAddressProps>`
  background-color: ${({ theme }) => theme.colors.black[50]};
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 14px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin: 0.5rem 0 0.25rem;
  height: 2.75rem;
  width: 100%;
`;

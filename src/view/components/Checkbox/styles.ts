import styled from 'styled-components';
import check from '../../../assets/icons/check.svg';

export const Wrapper = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;

  input[type='checkbox'] {
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    background-color: ${({ theme }) => theme.colors.black[200]};
    border-radius: 4px;
    width: 28px;
    height: 28px;
    margin-right: 0.5rem;
  }

  input[type='checkbox']:checked {
    background-color: ${({ theme }) => theme.colors.primary[400]};
    background-image: url(${check});
    background-position: center;
    background-repeat: no-repeat;
  }
`;

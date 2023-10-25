import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  .check {
    display: flex;
    gap: 6px;

    span {
      font-size: 12px;
      line-height: 18px;
      font-weight: 600;
    }
  }
`;

interface CheckCircleProps {
  readonly active: boolean;
}

export const CheckCircle = styled.div<CheckCircleProps>`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, active }) =>
    active ? theme.colors.white[400] : 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.white[400]};
  border-radius: 999px;
`;

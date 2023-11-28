import styled from 'styled-components';

export const DataLoadContainer = styled.div`
  max-width: 496px;
  width: 100%;

  form {
    padding-top: 1rem;

    .dimensions-load {
      display: flex;
      align-items: end;
      gap: 0.5rem;
      padding: 0.75rem 0 0.5rem;
    }

    .weight-load {
      padding: 0.75rem 0;
      display: flex;
      align-items: end;
      gap: 0.5rem;

      input {
        width: 320px;
      }

      select {
        width: 135px;
      }
    }

    label {
      font-weight: 600;
      font-size: 12px;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.white[600]};
    }

    textarea {
      background-color: ${({ theme }) => theme.colors.black[200]};
      color: ${({ theme }) => theme.colors.white[100]};
      font-size: 1rem;
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 0.875rem 1rem;
      height: 6.5rem;
      width: 100%;
    }
  }
`;

export const PreviewImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  div {
    margin-top: 0.5rem;
    position: relative;

    img {
      border-radius: 8px;
      width: 91px;
      height: 91px;
    }

    .icon {
      width: 1rem;
      height: auto;
      position: absolute;
      top: -4px;
      right: -4px;
    }
  }
`;

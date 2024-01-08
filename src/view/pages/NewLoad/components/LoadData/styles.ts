import styled from 'styled-components';

export const DataLoadContainer = styled.div`
  form {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .load-type {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;

      .error {
        margin-top: -12px;
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.complementary.red[500]};
      }
    }

    .load-dimensions {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
    }

    .weight-load {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      input {
        width: 320px;
      }

      select {
        width: 135px;
      }
    }

    > label {
      font-weight: 600;
      font-size: 12px;
      line-height: 150%;
      color: ${({ theme }) => theme.colors.white[600]};
    }
  }
`;

export const PreviewImages = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  div {
    position: relative;

    img {
      border-radius: 8px;
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
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

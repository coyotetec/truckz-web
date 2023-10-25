import styled from 'styled-components';

export const Container = styled.main`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  p {
    color: ${({ theme }) => theme.colors.white[700]};
    margin-top: 4px;
  }

  form {
    width: 100%;
    max-width: 496px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 24px 0 40px;

    > .error {
      margin-top: -4px;
      font-size: 12px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.complementary.red[500]};
    }
  }

  > button {
    width: 100%;
    max-width: 496px;
    margin: auto auto 0;
  }
`;

export const ImagePreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  img {
    width: 100%;
    border-radius: 8px;
  }

  .square {
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  .rect {
    aspect-ratio: 80 / 37;
    object-fit: cover;
  }
`;

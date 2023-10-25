import styled from 'styled-components';

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

import styled from 'styled-components';

export const Container = styled.div`
  .swiper-button-next,
  .swiper-button-prev {
    color: ${({ theme }) => theme.colors.white[100]};
    height: 100%;
    width: 60px;
    top: 20px;
  }

  .swiper-button-next {
    background: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 91.67%
    );
    right: 0;
  }

  .swiper-button-prev {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0) 91.67%
    );
    left: 0;
  }

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.colors.white[100]};
  }

  .load-image {
    height: 20rem;
    width: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .load-image-expanded {
    height: 100%;
    width: 100%;
  }

  .buttons-container {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 0.5rem;
    padding-bottom: 1.5rem;

    button {
      width: 12.5rem;
    }

    .cancel {
      background-color: ${({ theme }) => theme.colors.black[200]};
    }
  }
`;

export const Content = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 327px 327px;
  padding: 1.25rem 1.5rem;

  span {
    background-color: rgba(32, 95, 43, 0.5);
    border: 1px solid ${({ theme }) => theme.colors.primary[400]};
    border-radius: 999px;
    font-size: 12px;
    padding: 4px 12px;
    line-height: 150%;
  }

  .title {
    color: ${({ theme }) => theme.colors.white[400]};
    font-weight: 600;
    line-height: 140%;
    margin-top: 1rem;
  }

  h4 {
    color: ${({ theme }) => theme.colors.white[100]};
    font-weight: 600;
  }

  h5 {
    color: ${({ theme }) => theme.colors.white[100]};
    font-size: 1rem;
    margin-top: 0.75rem;
  }

  .load-data-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;

    small {
      display: block;
      font-size: 14px;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.white[100]};
    }
  }

  .origin-destination {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .city {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white[700]};
  }

  svg {
    color: ${({ theme }) => theme.colors.primary[400]};
  }

  .date {
    margin-top: 0.25rem;
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.white[400]};
  }
`;

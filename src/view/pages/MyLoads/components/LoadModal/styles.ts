import styled from 'styled-components';

export const Container = styled.div`
  .load-image {
    height: 12.5rem;
    width: 100%;
    object-fit: cover;
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

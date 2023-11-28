import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 8.75rem;
  background-color: ${({ theme }) => theme.colors.black[200]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;

  img {
    height: 100%;
    object-fit: cover;
    width: 7.5rem;
  }

  .content {
    padding: 1rem;
    width: 100%;

    small {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.white[700]};
      position: absolute;
      right: 16px;
      top: 8px;
    }

    h5 {
      color: ${({ theme }) => theme.colors.white[400]};
    }

    .local {
      align-items: center;
      display: flex;
      gap: 4px;
      margin-top: 6px;

      span {
        color: ${({ theme }) => theme.colors.white[400]};
        font-size: 0.875rem;
      }

      svg {
        color: ${({ theme }) => theme.colors.primary[400]};
      }
    }

    strong {
      color: ${({ theme }) => theme.colors.white[100]};
      font-size: 1rem;
      margin-top: 4px;
      display: block;
    }

    .tags {
      margin-top: 8px;
      display: flex;
      gap: 4px;

      span {
        background-color: rgba(32, 95, 43, 0.5);
        border: 1px solid ${({ theme }) => theme.colors.primary[400]};
        border-radius: 999px;
        font-size: 12px;
        padding: 4px 12px;
        line-height: 150%;
      }
    }

    .line {
      background: ${({ theme }) => theme.colors.complementary.green[500]};
      border-radius: 0 8px 8px 0;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      width: 6px;
    }
  }
`;

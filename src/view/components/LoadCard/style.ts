import styled from 'styled-components';

export const Card = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black[200]};
  border-radius: 8px;
  display: flex;
  height: 8.75rem;
  position: relative;
  width: 31rem;

  img {
    border-radius: 8px 0 0 8px;
    height: 100%;
    object-fit: cover;
    width: 7.5rem;
  }

  .content {
    margin-left: 1rem;

    small {
      position: absolute;
      right: 16px;
      top: 8px;
    }

    h4 {
      color: ${({ theme }) => theme.colors.white[400]};
      margin-bottom: 6px;
    }

    .local {
      align-items: center;
      display: flex;

      span {
        color: ${({ theme }) => theme.colors.white[400]};
        font-size: 0.875rem;
      }

      svg {
        color: ${({ theme }) => theme.colors.primary[400]};
        margin: 0 4px;
      }
    }

    strong {
      color: ${({ theme }) => theme.colors.white[100]};
      font-size: 1rem;
    }

    .tags {
      display: flex;
      margin-top: 8px;

      p {
        background-color: ${({ theme }) => theme.colors.primary[400]};
        border: 2px solid ${({ theme }) => theme.colors.primary[400]};
        border-radius: 999px;
        color: ${({ theme }) => theme.colors.white[400]};
        font-size: small;
        margin-right: 4px;
        padding: 4px 12px;
      }
    }

    .line {
      background: ${({ theme }) => theme.colors.primary[400]};
      border-radius: 0 8px 8px 0;
      height: 140px;
      position: absolute;
      top: 0;
      right: 0;
      width: 8px;
    }
  }
`;

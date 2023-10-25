import styled from 'styled-components';

export const Container = styled.aside`
  width: 20rem;
  height: 100vh;
  padding: 2.5rem 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${({ theme }) => theme.colors.black[600]};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    width: 100%;
    margin-top: 2rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 8px;
      color: ${({ theme }) => theme.colors.white[400]};
      text-decoration: none;
      font-weight: 500;

      &.active {
        background-color: ${({ theme }) => theme.colors.primary[400]};
        color: ${({ theme }) => theme.colors.white[100]};
      }
    }

    hr {
      border: 1px solid ${({ theme }) => theme.colors.black[200]};
      margin: 0.5rem 0;
    }
  }

  footer {
    margin-top: auto;

    .profile {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      img {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: cover;
        border-radius: 999px;
      }

      strong {
        font-size: 14px;
      }
    }

    .signout-button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.75rem 0rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      border-radius: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors.black[200]};
      background: ${({ theme }) => theme.colors.black[400]};
      color: ${({ theme }) => theme.colors.white[800]};
      font-weight: 500;
    }
  }
`;

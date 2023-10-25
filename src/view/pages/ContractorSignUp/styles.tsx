import styled from 'styled-components';
import truckFilling from '../../../assets/images/truck-filling.png';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  .content {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;

    svg {
      align-self: center;
    }

    h1 {
      display: flex;
      align-items: center;
      gap: 12px;

      .back-button {
        display: flex;
        background: transparent;
        border: none;
        outline: none;
      }
    }

    > p {
      margin-top: 8px;
    }

    form {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      .grouped {
        display: flex;
        gap: 8px;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 12px;

        button {
          flex: 1;
        }
      }

      > .error {
        margin-top: -4px;
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.complementary.red[500]};
      }
    }
  }

  .image {
    position: fixed;
    width: 50vw;
    height: 100vh;
    top: 0;
    right: 0;
    overflow: hidden;
    background-image: url(${truckFilling});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 1;
  }
`;

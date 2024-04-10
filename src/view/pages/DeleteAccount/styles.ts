import styled from 'styled-components';
import truckOnRoadImage from '../../../assets/images/truck-on-road.png';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    padding: 32px 20px;

    svg {
      align-self: center;
    }

    h1 {
      margin-top: 40px;
    }

    p {
      margin-top: 8px;
    }

    form {
      margin-top: 72px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      > a {
        margin-top: -8px;
        font-size: 14px;
        font-weight: 600;
        line-height: 145%;
        text-align: right;
        color: ${({ theme }) => theme.colors.primary[300]};
        text-decoration: none;
      }

      .actions {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
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
    background-image: url(${truckOnRoadImage});
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
    z-index: 1;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;

    .image {
      display: none;
    }
  }
`;

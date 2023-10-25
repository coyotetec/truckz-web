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

      > span {
        margin-top: -8px;
        font-size: 14px;
        font-weight: 600;
        line-height: 145%;
        text-align: right;
        color: ${({ theme }) => theme.colors.primary[300]};
      }

      .actions {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }

  .image {
    position: fixed;
    width: 50vw;
    height: 100vh;
    top: 0;
    right: 0;
    border-radius: 20px;
    overflow: hidden;
    background-image: url(${truckOnRoadImage});
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
    z-index: 1;
  }
`;

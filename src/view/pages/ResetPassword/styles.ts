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

    p {
      margin-top: 8px;
    }

    form {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      gap: 12px;

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
`;

import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding-left: 320px;
  position: relative;
`;

export const Sidebar = styled.aside`
  float: left;
  height: 100vh;
  background: ${({ theme }) => theme.colors.black[500]};
  width: 320px;
  padding: 40px 20px;
  position: fixed;
  top: 0;
  left: 320px;
  z-index: 999;

  .items {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 32px;

    a {
      padding: 12px 16px;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.white[400]};
      font-weight: 500;
      line-height: 140%;
      border-radius: 8px;

      &.active {
        background: ${({ theme }) => theme.colors.black[300]};
      }
    }
  }
`;

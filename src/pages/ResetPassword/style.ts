import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: stretch;
  background: #282a36;
`;

const animatedRightToLeft = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1
  }
`;

export const AnimatedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 765px;
  margin: 0 auto;

  animation: ${animatedRightToLeft} 1s;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 40px 15px 0px 15px;

  > div {
    > h1 {
      color: #f4ede8;
      text-align: center;
      font-weight: 500;
      font-size: 48px;
      margin-bottom: 12px;
    }

    p {
      color: #f4ede8;
      font-weight: 300;
      font-size: 22px;
      text-align: center;
    }
    div {
      margin-top: 28px;
      text-align: center;
      svg {
        color: #f22f74;
        width: 24px;
        height: 48px;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 350px;
    margin: 28px 10px 10px 0;
    text-align: center;

    h1 {
      color: #f4ede8;
      font-weight: 300;
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  > a {
    display: flex;
    align-items: center;
    margin-top: 80px;
    color: #f4ede8;
    transition: color 0.2s;
    text-decoration: none;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }

  > p {
    margin-top: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f4ede8;

    svg {
      width: 32px;
      height: 32px;
      margin: 0 5px;
      color: #f22f74;
    }
  }
`;

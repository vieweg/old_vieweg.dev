import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.6);
`;

const animatedLeftToRight = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 450px;
  margin: 50px auto;
  animation: ${animatedLeftToRight} 0.5s;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 15px 1px #999;

  div.btn-close {
    flex: 1;
    text-align: right;
    margin: 10px 25px 0px 25px;

    svg {
      margin-right: -10px;
      width: 16px;
      height: 16px;
      color: #666;
      cursor: pointer;
      transition: color 2ms;

      &:hover {
        color: #333;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 10px 25px;
  text-align: center;
  white-space: pre-line;
  color: #000;

  h1 {
    font-size: 18px;
    margin-bottom: 25px;
    border-bottom: 1px solid #eaebeb;
  }

  div.actions {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 25px 0 10px 0;
    padding-top: 25px;
    border-top: 1px solid #eaebeb;

    button {
      border: 0;
      border-radius: 10px;
      padding: 5px 10px;
      transition: background-color 0.2s;
      color: #fff;
      background: #077ee4;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

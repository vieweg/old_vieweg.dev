import styled from 'styled-components';

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 25px;
  font-size: 32px;
`;

export const Container = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 40px;
  border-radius: 10px;
  flex-wrap: wrap;
  transition: all 0.2s;
  position: relative;
  background: #fbfbfb;

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 50%;
    width: 30px;
    height: 3px;
    border-top: 1px solid #cacaca;
    border-bottom: 1px solid #cacaca;
  }

  &:hover {
    background: #f7f7f7;
  }
`;

export const CardTitle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 165px;
  margin-bottom: 25px;
  padding-right: 20px;

  h1 {
    margin-top: 45px;
    a {
      font-size: 28px;
      text-decoration: none;
      color: #282a36;
      transition: all 0.2s;

      &:hover {
        color: #4b4c56;
      }
    }
  }
  span {
    display: flex;
    align-items: center;
    color: #333;
    font-size: 14px;
    font-weight: 300;
    margin-top: 15px;
    margin-bottom: 15px;
    > svg {
      width: 16px;
      height: 16px;
      color: #999;
      margin-right: 8px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      margin-top: 24px;
    }
  }
`;

export const Section = styled.article`
  display: flex;
  flex-direction: column;
  flex: 2;
  min-width: 350px;
  justify-content: center;

  a {
    img {
      width: 100%;
      transition: all 0.2s;

      &:hover {
        filter: grayscale(30%);
      }
    }
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 24px;
    white-space: pre-line;
  }
`;

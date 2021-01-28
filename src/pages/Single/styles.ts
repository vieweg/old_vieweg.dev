import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1240px;
  margin: 45px auto;
  display: flex;
  flex: 4;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 25px;
  flex: 3;
`;

export const Title = styled.div`
  display: flex;
  min-width: 165px;
  margin-top: 12px;
  margin-bottom: 25px;
  flex-direction: column;
  flex: 1;
  text-align: center;
  h1 {
    margin-bottom: 25px;
    font-size: 32px;
  }
  span {
    display: flex;
    justify-content: flex-end;
    color: #333;
    font-size: 14px;
    font-weight: 300;
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
  min-width: 350px;
  justify-content: center;
  > img {
    width: 100%;
    transition: all 0.2s;
    &:hover {
      filter: grayscale(30%);
    }
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    white-space: pre-line;
  }
  div.masonry {
    margin-top: 24px;
    strong {
      font-size: 20px;
    }
    ul {
      margin-top: 12px;
      list-style: none;
      li {
        width: 33%;
        padding: 6px;
        @media (max-width: 768px) {
          width: 50%;
        }
        @media (max-width: 500px) {
          width: 100%;
        }
        button {
          border: none;
          background: none;
          color: none;
          > img {
            width: 100%;
            transition: all 0.2s;
            &:hover {
              filter: grayscale(30%);
            }
          }
        }
      }
    }
  }
`;

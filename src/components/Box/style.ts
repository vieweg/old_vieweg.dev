import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid #cacaca;
  border-radius: 15px;
  background: #f6f7f8;
  margin: 15px;
  text-align: center;

  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px;
    color: #000;
    text-decoration: none;

    svg {
      margin-top: 10px;
      width: 75px;
      height: 75px;
    }

    h3 {
      margin: 10px 0;
      font-size: 18px;
    }

    small {
      font-size: 12px;
    }
  }
  &:hover {
    box-shadow: 4px 4px 10px -10px #000;
  }
`;

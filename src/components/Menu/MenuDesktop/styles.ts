import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: #fff;
  text-align: center;
  ul {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      border-bottom: 1px solid transparent;
      text-align: left;

      &:hover {
        border-bottom: 1px solid #000;
      }

      a {
        display: block;
        padding: 15px 10px;
        width: 100%;
        text-decoration: none;
        color: #888;
        font-size: 20px;
        font-weight: 500;

        &:hover {
          color: #000;
        }
      }
    }
  }
`;

import styled from 'styled-components';

interface IContainerProps {
  isOpened?: boolean;
}
export const Button = styled.div`
  position: fixed;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  top: 30%;
  right: 0;
  background: #1da1f2;
  padding: 13px 13px 13px 0;
  width: 35px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  transition: all 0.2s;
  color: #fff;
  z-index: 1000;
  cursor: pointer;

  &:hover {
    padding-right: 20px;
  }
`;

export const Container = styled.div<IContainerProps>`
  position: fixed;
  display: flex;
  top: 0;
  right: ${props => (props.isOpened ? 0 : '-350px')};
  width: 340px;
  height: 100%;
  justify-content: flex-start;
  background: #fff;
  box-shadow: 10px 0 10px 10px #888;
  transition: all 0.5s;
  z-index: 1110;

  div {
    flex: 1;
    text-align: center;
    font-size: 20px;
    color: #1da1f2;

    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      margin: 25px 25px;
      border-bottom: 1px solid #282a36;

      button {
        display: flex;
        align-items: center;
        border: none;
        background: none;
        padding: 0;

        svg {
          color: #282a36;
          width: 32px;
          height: 32px;
          transition: all 0.5s;
          margin-right: 8px;

          &:hover {
            transform: rotate(90deg);
          }
        }
      }
    }

    ul {
      margin: 25px;
      list-style: none;
      display: flex;
      flex-direction: column;

      li {
        width: 100%;
        border-bottom: 1px solid transparent;
        text-align: right;

        &:hover {
          border-bottom: 1px solid #1da1f2;
        }
        a {
          display: flex;
          padding: 15px 5px;
          width: 100%;
          text-decoration: none;
          color: #282a36;

          &:hover {
            color: #000;
          }
        }
      }
    }
  }
`;

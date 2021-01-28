import styled, { keyframes } from 'styled-components';

export const SearchResult = styled.div`
  margin: 20px 0 10px 50px;
  b {
    margin: 0 8px;
    font-weight: 500;
  }

  button {
    background: transparent;
    border: none;
    color: #077ee4;
    text-decoration: underline;
  }
`;

export const TableTitle = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  min-width: 235px;
  padding: 7px 0;
  font-size: 0.9rem;

  ul {
    list-style: none;
    display: flex;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;

    li {
      padding: 2px 5px;

      button,
      a {
        background: transparent;
        border: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #077ee4;
        font-size: 14px;
        transition: color 0.2s;
        text-decoration: none;

        svg {
          width: 10px;
          height: 10px;
          color: inherit;
          margin-left: 3px;
        }

        &:hover {
          color: #63b7ff;
        }
      }

      button {
        margin-left: 0px;
        cursor: pointer;
      }

      & + li {
        border-left: 1px solid #cacaca;
      }
    }
  }
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  margin: 50px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid #63b7ff;
  border-right: 2px solid #63b7ff;
  border-bottom: 2px solid #63b7ff;
  border-left: 3px solid #077ee4;
  background: transparent;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

import styled from 'styled-components';

export const ContainerLeft = styled.aside`
  display: flex;
  padding: 0 15px;
  box-shadow: 10px 0 10px -15px #000;
  margin-right: 25px;
`;

export const ContainerRight = styled.aside`
  display: flex;
  flex: 1;
  box-shadow: -10px 0 10px -15px #000;
  margin-left: 25px;
  padding-left: 10px;
  order: 2;
`;

export const ContainerSkeleton = styled.div`
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

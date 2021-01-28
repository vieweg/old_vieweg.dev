import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  color: #999;

  svg {
    width: 60px;
    height: 60px;
  }

  > strong {
    font-size: 22px;
    margin: 25px 0;
  }

  > p {
    font-size: 16px;
  }
`;

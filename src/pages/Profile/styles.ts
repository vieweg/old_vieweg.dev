import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  max-width: 1240px;
  margin: 45px auto;
  display: flex;
  flex: 4;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 8px;
  flex: 5;

  div#empty {
    flex: 1;
    text-align: center;
  }
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-bottom: 25px;
  font-size: 32px;
`;

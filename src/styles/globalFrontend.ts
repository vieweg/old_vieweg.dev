import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}
body{
  background: #fff;
  color: #282a36;
  -webkit-font-smoothing: antialiased;
}
body, button, input {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
h1, h2, h3, h4, h5, strong {
  font-weight: 500;
}
button{
  cursor: pointer;
}
a{
  text-decoration: none;
}
`;

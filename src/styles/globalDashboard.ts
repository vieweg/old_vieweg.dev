import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
  margin: 0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}

body{
  -webkit-font-smoothing: antialiased;
}

button{
  cursor: pointer;
}

input:-webkit-autofill {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
}
`;

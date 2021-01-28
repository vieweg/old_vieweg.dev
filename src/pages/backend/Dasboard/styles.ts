import styled from 'styled-components';
import { Paper } from '@material-ui/core';

export const MyPaper = styled(Paper)`
  ${({ theme }) => `
  h3 {
    font-size: ${theme.palette.color.textSecondary};
  }
`}
`;

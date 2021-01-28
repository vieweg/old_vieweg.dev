import React, { HTMLAttributes } from 'react';

import { Container } from './style';

type IProps = HTMLAttributes<HTMLDivElement>;

const Box: React.FC<IProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Box;

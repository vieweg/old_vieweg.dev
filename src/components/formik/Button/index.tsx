import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './style';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Container type="button" {...props} disabled={loading}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;

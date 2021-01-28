import React from 'react';

import { FiAlertCircle } from 'react-icons/fi';
import { Container } from './styles';

interface IProps {
  title: string;
  message: string;
}
const ErroMessage: React.FC<IProps> = ({ title, message }: IProps) => (
  <Container>
    <FiAlertCircle />
    <strong>{title}</strong>
    <p>{message}</p>
  </Container>
);

export default ErroMessage;

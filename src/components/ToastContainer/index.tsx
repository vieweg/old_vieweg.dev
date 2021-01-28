import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';
import Toast from './Toast';

interface ToastProps {
  messages: ToastMessage[];
}
const ToastContainer: React.FC<ToastProps> = ({ messages }) => {
  const messagesWhitTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  );
  if (messagesWhitTransitions.length > 0) {
    return (
      <Container>
        {messagesWhitTransitions.map(({ item, key, props }) => (
          <Toast key={key} style={props} message={item} />
        ))}
      </Container>
    );
  }
  return null;
};

export default ToastContainer;

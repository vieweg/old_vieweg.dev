import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icon = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      style={style}
      has_description={Number(!!message.description)}
      onClick={() => removeToast(message.id)}
    >
      {icon[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};

export default Toast;

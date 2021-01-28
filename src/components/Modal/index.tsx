import React, { CSSProperties } from 'react';

import { FiXCircle } from 'react-icons/fi';
import { Container, Wrapper, Content } from './styles';

interface ModalProps {
  title: string;
  description?: string;
  buttons?: {
    label: string;
    handleClick(): void;
    style?: CSSProperties;
  }[];
  handleClose(): void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  buttons,
  handleClose,
}) => {
  return (
    <Container onClick={handleClose}>
      <Wrapper>
        <div className="btn-close">
          <FiXCircle onClick={handleClose} />
        </div>
        <Content>
          <h1>{title}</h1>
          <p>{description}</p>
          {buttons && (
            <div className="actions">
              {buttons.map((button, index) => (
                <button
                  key={`btn-${index}`}
                  type="button"
                  onClick={button.handleClick}
                  style={button.style}
                >
                  {button.label}
                </button>
              ))}
            </div>
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Modal;

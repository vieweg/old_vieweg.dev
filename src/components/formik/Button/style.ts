import styled from 'styled-components';
import { shade, grayscale } from 'polished';

export const Container = styled.button`
  margin-top: 20px;
  background: #077ee4;
  color: #fff;
  border: 0;
  border-radius: 15px;
  padding: 16px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#077ee4')};
  }

  &:disabled {
    background: ${grayscale('#077ee4')};
  }
`;

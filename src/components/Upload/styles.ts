import { Typography } from '@material-ui/core';
import styled from 'styled-components';

interface UploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  refKey?: string;
  [key: string]: any;
  type?: 'error' | 'success' | 'default';
}

export const DropContainer = styled.div`
  border: 2px dashed #969cb3;
  border-radius: 5px;
  padding: 16px;
  text-align: center;
  cursor: pointer;

  transition: height 0.2s ease;

  border-color: ${({ type, theme }: UploadProps) => {
    switch (type) {
      case 'success':
        return theme.palette.success[theme.palette.type];
      case 'error':
        return theme.palette.error[theme.palette.type];
      default:
        return theme.palette.text[theme.palette.type];
    }
  }};
`;

export const UploadMessage = styled(Typography)`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 15px 0;
  text-align: center;

  color: ${({ type, theme }: UploadProps) => {
    switch (type) {
      case 'success':
        return theme.palette.success[theme.palette.type];
      case 'error':
        return theme.palette.error[theme.palette.type];
      default:
        return theme.palette.text[theme.palette.type];
    }
  }};

  justify-content: center;
  align-items: center;
`;

import { Box, Paper } from '@material-ui/core';
import React from 'react';

import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

interface UploadProps {
  onFilesDrop: Function;
  accept?: string[];
  maxSize?: number;
  minSize?: number;
  multiple?: boolean;
  txtSuccess?: string;
  txtError?: string;
  txtDefault?: string;
}

const Upload: React.FC<UploadProps> = ({
  onFilesDrop,
  accept,
  maxSize = 8400000,
  minSize = 0,
  multiple = true,
  txtSuccess = 'Solte o(s) arquivo(s) aqui',
  txtError = 'Arquivo(s) não suportado(s)',
  txtDefault = 'Arraste e solte os arquivos aqui, ou clique e selecione.',
}: UploadProps) => {
  const messages = {
    success: txtSuccess,
    error: txtError,
    default: txtDefault,
  };

  function getStatus(
    isDragActive: boolean,
    isDragReject: boolean,
  ): 'success' | 'error' | 'default' {
    if (isDragActive || isDragReject) {
      return isDragReject ? 'error' : 'success';
    }
    return 'default';
  }

  return (
    <Paper>
      <Box p={2}>
        <Dropzone
          accept={accept}
          maxSize={maxSize}
          minSize={minSize}
          multiple={multiple}
          onDrop={(files, rejectFiles) => onFilesDrop(files, rejectFiles)}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragReject,
          }): any => {
            const status = getStatus(isDragActive, isDragReject);
            return (
              <DropContainer
                {...getRootProps({ type: status })}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
              >
                <input {...getInputProps()} />
                <UploadMessage type={status}>{messages[status]}</UploadMessage>
              </DropContainer>
            );
          }}
        </Dropzone>
      </Box>
    </Paper>
  );
};

export default Upload;

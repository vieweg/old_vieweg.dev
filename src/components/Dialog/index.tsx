import React from 'react';
import {
  Dialog as ModalDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonProps,
} from '@material-ui/core';
import {} from '@material-ui/core/styles/withStyles';

interface DialogProps {
  open: boolean;
  title: string;
  description1?: string;
  description2?: string;
  buttons?: {
    label: string;
    handleClick(): void;
    props?: ButtonProps;
  }[];
  handleClose(): void;
}
const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  description1,
  description2,
  buttons,
  handleClose,
}) => {
  return (
    <ModalDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description1}
          <br />
          <br />
          {description2}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons &&
          buttons.map((button, index) => (
            <Button
              key={`btn-${index}`}
              type="button"
              onClick={button.handleClick}
              {...button.props}
            >
              {button.label}
            </Button>
          ))}
      </DialogActions>
    </ModalDialog>
  );
};

export default Dialog;

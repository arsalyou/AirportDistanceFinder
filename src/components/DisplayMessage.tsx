import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { MsgProps } from '../types';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function DisplayMessage({ message, show }: MsgProps) {
  const [state, setState] = useState<State>({
    open: show,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={show}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  )
}
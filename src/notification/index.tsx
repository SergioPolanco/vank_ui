import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { AlertColor } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { closeNotification } from './redux/notificationSlice';
import { AppDispatch, RootState } from '../app/redux/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface NotificationsProps {
  timeout: number
}

const Notifications = ({ timeout }: NotificationsProps) => {
  const message = useSelector<RootState, string | undefined>((state) => state.notification.message)
  const open = useSelector<RootState, boolean>((state) => state.notification.open)
  const severity = useSelector<RootState, AlertColor>((state) => state.notification.severity)
  const snackBarOrigin: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
  }
  const dispatch: AppDispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      closeNotification()
    )
  };
  

  useEffect(() => {
    let TIMER: ReturnType<typeof setTimeout>;
    const handleTimeout = () => {
      TIMER = setTimeout(() => {
        dispatch(closeNotification());
      }, timeout);
    }
    if (open) {
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [dispatch, open, timeout]);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: snackBarOrigin.vertical,
        horizontal: snackBarOrigin.horizontal
      }}
      open={open}
      onClose={handleClose}
      key={
        snackBarOrigin.vertical + snackBarOrigin.horizontal
      }
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notifications
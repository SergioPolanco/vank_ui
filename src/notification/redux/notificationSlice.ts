import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface NotificationState {
  open: boolean;
  message: string;
  severity: AlertColor
}

interface openPayload {
  message: string,
  severity: AlertColor
}

const initialState: NotificationState = {
  open: false,
  message: '',
  severity: 'success'
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    openNotification: (state, action: PayloadAction<openPayload>) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    closeNotification: (state) => {
      state.open = false
      state.message = ''
    },
  },
})

export const { openNotification, closeNotification } = notificationSlice.actions

export default notificationSlice.reducer
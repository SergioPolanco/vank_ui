import { configureStore } from '@reduxjs/toolkit'
import invoiceReducer from '../../invoice/redux/invoiceSlice'
import notificationReducer from '../../notification/redux/notificationSlice'

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    notification: notificationReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
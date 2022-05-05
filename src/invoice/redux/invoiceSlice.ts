import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Invoice } from '../interfaces/invoce';

export interface InvoiceState {
  items: Invoice[];
  loading: boolean
}

const initialState: InvoiceState = {
  items: [],
  loading: false,
};

export const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    getInvoices: (state) => {
      state.loading = true
    },
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.items = action.payload
      state.loading = false
    }
  },
})

export const { getInvoices, setInvoices } = invoiceSlice.actions

export default invoiceSlice.reducer
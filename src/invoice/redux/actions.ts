import { Dispatch } from '@reduxjs/toolkit';
import { getInvoices, setInvoices } from './invoiceSlice';
import {
  fetchInvoices,
  FetchInvoicesParams,
} from '../services/invoice.service';
import { openNotification } from '../../notification/redux/notificationSlice';

export const fetchInvoicesAction = (params: FetchInvoicesParams) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      dispatch(getInvoices());
      const response = await fetchInvoices(params);
      dispatch(setInvoices(response.data));
    } catch (error) {
      dispatch(
        openNotification({
          severity: 'error',
          message: 'Error',
        }),
      );
    }
  };
};

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { fetchInvoicesAction } from '../../redux/actions';
import { useQuery } from '../../../common/hooks/request';
import { FetchInvoicesParams } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoce';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 130,
    renderCell: (params: GridValueGetterParams) =>
      <Link href={`/users/${params.row.vendor.internalCode}`}>
        {params.row.vendor.companyName}
      </Link>,
  },
  { field: 'number', headerName: 'Number', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'total', headerName: 'Total', width: 130 },
  { field: 'paymentTotal', headerName: 'Payment total', width: 130 },
  { field: 'creditTotal', headerName: 'Credit total', width: 130 },
  {
    field: 'bank',
    headerName: 'Bank',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      params.row.bank.id
  },
  { field: 'dueDate', headerName: 'Due Date', width: 130 },
  { field: 'paymentDate', headerName: 'Payment Date', width: 130 },
  { field: 'currency', headerName: 'Currency', width: 130 }
];

const InvoicesTable = () => {
  const invoices = useSelector<RootState, Invoice[]>((state) => state.invoice.items)
  const query = useQuery();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const querVendor = query.get('vendor');
    const queryFrom = query.get('from')
    const queryTo = query.get('to')
    const queryCurrency = query.get('currency')
    const params: FetchInvoicesParams = {
      ...(querVendor && { vendor: parseInt(querVendor) }),
      ...(queryFrom && { from: new Date(queryFrom) }),
      ...(queryTo && { to: new Date(queryTo) }),
      ...(queryCurrency && { currency: queryCurrency })
    }
    dispatch(fetchInvoicesAction(params));
  }, [dispatch, query]);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={invoices}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default InvoicesTable
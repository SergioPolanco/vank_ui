import api from "../../common/config/api";

export interface FetchInvoicesParams {
  vendor?: number,
  from?: Date,
  to?: Date,
  currency?: string;
}

const fetchInvoices = (params: FetchInvoicesParams) => api.get("/v1/invoices", { params })

export {
  fetchInvoices
}
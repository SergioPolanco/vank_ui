import { User } from '../../user/interfaces/user';

export interface Invoice {
  id: number;
  vendor: User;
  number: string;
  date: Date;
  total: number;
  paymentTotal: number;
  creditTotal: number;
  bank: number;
  dueDate: Date;
  paymentDate: Date;
  currency: string;
}

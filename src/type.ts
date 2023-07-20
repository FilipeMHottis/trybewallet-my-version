import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type User = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
};

export type Expense = {
  id: number;
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  valueInBRL: number;
};

export type CurrencyData = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: number;
  timestamp: string;
  create_date: string;
};

export type RootState = {
  user: {
    email: string;
    password: string;
    loading: boolean;
    error: string;
    currencyExchange: string;
    money: number;
  },
  wallet: {
    currencies: CurrencyData[];
    expenses: Expense[];
  },
};

export type ReduxState = {
  isFetching: boolean,
  currencies: string[],
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

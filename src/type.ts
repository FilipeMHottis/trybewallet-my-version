import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type User = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
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

export type Expense = {
  value: string;
  currency: string;
  method: string;
  tag: string;
  description: string;
  id: number;
  exchangeRates: CurrencyData[];
};

export type RootState = {
  user: {
    email: string;
    password: string;
    loading: boolean;
    error: string;
    currencyExchange: string;
  },
  wallet: {
    currencies: string[];
    currenciesInf: CurrencyData[];
    expenses: Expense[];
  },
};

export type ReduxState = {
  isFetching: boolean,
  currencies: string[],
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

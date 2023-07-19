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
    currencies: string[];
  },
};

export type ReduxState = {
  isFetching: boolean,
  currencies: string[],
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

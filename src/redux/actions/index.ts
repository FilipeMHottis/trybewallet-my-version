// Tipagem das actions
import { Dispatch, User, Expense } from '../../type';

// Comandos para a actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_EXCHANGE_START = 'CURRENCY_EXCHANGE_START';
export const CURRENCY_EXCHANGE_SUCCESS = 'CURRENCY_EXCHANGE_SUCCESS';
export const EXPENSES = 'EXPENSES';

// Actions
// Login
export const userLogin = (user?: User) => {
  // Se não passar user retorna um objeto vazio
  if (!user) {
    return {
      type: USER_LOGIN,
      payload: {
        email: '',
        password: '',
        loading: false,
        error: '',
      },
    };
  }

  // Se passar user retorna o objeto com os dados no scopo global
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

// Currency Exchange
export const fetchCurrencies = () => {
  return async (dispatch: Dispatch) => {
    dispatch(currencyExchangeStart());

    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data);
      currencies.splice(currencies.indexOf('USDT'), 1);
      dispatch(currencyExchangeSuccess(currencies));
    } catch (error) {
      console.log(error);
    }
  };
};
export const currencyExchangeStart = () => ({
  type: CURRENCY_EXCHANGE_START,
});
export const currencyExchangeSuccess = (data: string[]) => ({
  type: CURRENCY_EXCHANGE_SUCCESS,
  payload: data,
});

export const expenses = (e: Expense) => {
  return {
    type: EXPENSES,
    payload: e,
  };
};

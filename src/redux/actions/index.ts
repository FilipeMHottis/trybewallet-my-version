// Tipagem das actions
import { Dispatch, User, Expense } from '../../type';

// Comandos para a actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_EXCHANGE_START = 'CURRENCY_EXCHANGE_START';
export const CURRENCY_EXCHANGE_SUCCESS = 'CURRENCY_EXCHANGE_SUCCESS';
export const EXPENSES = 'EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

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
      // Chamada da API + JSON
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();

      // Desestruturação dos dados
      const { ...currenciesInf } = data;

      // Retorno dos dados
      dispatch(currencyExchangeSuccess(currenciesInf));
    } catch (error) {
      // Se ocorrer algum erro
      console.log(error);
    }
  };
};
export const currencyExchangeStart = () => ({
  type: CURRENCY_EXCHANGE_START,
});
export const currencyExchangeSuccess = (data: []) => {
  const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
  const currenciesInf = data;
  return {
    type: CURRENCY_EXCHANGE_SUCCESS,
    payload: {
      currencies,
      currenciesInf,
    },
  };
};

export const expenses = (e: Expense) => {
  return {
    type: EXPENSES,
    payload: e,
  };
};

export const deleteExpense = (newEpense: Expense[]) => ({
  type: DELETE_EXPENSE,
  payload: newEpense,
});

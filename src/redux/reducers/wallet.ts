import { AnyAction } from 'redux';
import { CURRENCY_EXCHANGE_SUCCESS, EXPENSES, DELETE_EXPENSE } from '../actions';

const initialState = {
  currencies: [],
  currenciesInf: [],
  expenses: [],
};

const wallet = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CURRENCY_EXCHANGE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case EXPENSES: {
      return { ...state, expenses: [...state.expenses, action.payload] };
    }
    case DELETE_EXPENSE: {
      return { ...state, expenses: action.payload };
    }
    default:
      return state;
  }
};

export default wallet;

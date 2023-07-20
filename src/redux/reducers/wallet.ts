import { AnyAction } from 'redux';
import { CURRENCY_EXCHANGE_SUCCESS, EXPENSES } from '../actions';

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
      console.log([...state.expenses, action.payload]);
      return { ...state, expenses: [...state.expenses, action.payload] };
    }
    default:
      return state;
  }
};

export default wallet;

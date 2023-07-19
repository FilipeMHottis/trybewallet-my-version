import { AnyAction } from 'redux';
import { CURRENCY_EXCHANGE_SUCCESS, EXPENSES } from '../actions';

const initialState = {
  currencies: [],
};

const wallet = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    case CURRENCY_EXCHANGE_SUCCESS: {
      return { ...state, currencies: action.payload };
    }
    case EXPENSES: {
      return { ...state, expenses: action.payload };
    }
    default: return state;
  }
};

export default wallet;

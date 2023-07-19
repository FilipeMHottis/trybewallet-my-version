import { AnyAction } from 'redux';
import { USER_LOGIN } from '../actions';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
  currencyExchange: 'BRL',
  money: 0,
};

const user = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, ...action.payload };
    }

    // Caso não seja nenhuma das actions acima, retorne o state atual
    default: return state;
  }
};

export default user;

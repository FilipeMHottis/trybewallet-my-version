import { AnyAction } from 'redux';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
};

const userReducer = (state = initialState, action:AnyAction) => {
  switch (action.type) {
    default: return state;
  }
};

export default userReducer;

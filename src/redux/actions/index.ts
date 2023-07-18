// Comandos para a actions
export const USER_LOGIN = 'USER_LOGIN';

// Tipagem das actions
type User = {
  email: string;
  password: string;
  loading: boolean;
  error: string;
};

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

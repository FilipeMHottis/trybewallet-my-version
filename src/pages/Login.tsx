import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/actions';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  // Funções Handle
  // Para o onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  // Para o onSubmit
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(userLogin(form));
    navigate('/carteira');
  };

  return (
    <>
      {/* Header - Cotendo o Titulo */}
      <head>
        <h1>Login</h1>
      </head>

      {/* Main - Contendo o Formulario */}
      <main>
        <form>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ handleChange }
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ handleChange }
          />

          {/* Botão Submit */}
          <button
            type="submit"
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;

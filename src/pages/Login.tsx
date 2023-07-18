import React, { useState, useEffect } from 'react';
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
  const [valid, setValid] = useState(false);

  // Função de validação
  const validateForm = () => {
    const { email, password } = form;

    if (!email || !password) {
      setForm((prevForm) => (
        { ...prevForm, error: 'Por favor, preencha todos os campos.' }
      ));
      return false;
    }

    if (!email.includes('@') || !email.includes('.com')) {
      setForm((prevForm) => (
        { ...prevForm, error: 'Por favor, insira um email válido.' }
      ));
      return false;
    }

    if (password.length < 6) {
      setForm((prevForm) => (
        { ...prevForm, error: 'A senha deve ter pelo menos 6 caracteres.' }
      ));
      return false;
    }

    setForm((prevForm) => ({ ...prevForm, error: '' }));
    return true;
  };

  // Efeito para validar o formulário
  useEffect(() => {
    setValid(validateForm());
  }, [form.email, form.password]);

  // Para o onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Para o onSubmit
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (valid) {
      dispatch(userLogin(form));
      navigate('/carteira');
    }
  };

  return (
    <>
      {/* Header - Contendo o Titulo */}
      <header>
        <h1>Login</h1>
      </header>

      {/* Main - Contendo o Formulario */}
      <main>
        <form>
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            value={ form.email }
            onChange={ handleChange }
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            value={ form.password }
            onChange={ handleChange }
          />

          {/* Mensagem de erro */}
          {form.error && <p>{form.error}</p>}

          {/* Botão Submit */}
          <button
            type="submit"
            onClick={ handleSubmit }
            disabled={ !valid }
          >
            Entrar
          </button>
        </form>
      </main>
    </>
  );
}

export default Login;

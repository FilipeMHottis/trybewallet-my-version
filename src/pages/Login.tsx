import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/actions';

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: '',
  currencyExchange: 'BRL',
  money: 0,
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

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
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
  }, [form]);

  // Para o onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Para o onSubmit
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    dispatch(userLogin(form));
    navigate('/carteira');
  };

  return (
    <>
      {/* Header - Contendo o Titulo */}
      <header className="bg-primary py-3">
        <h1 className="text-white text-center">Login</h1>
      </header>

      {/* Main - Contendo o Formulario */}
      <main className="container mt-5">
        <form className="row g-3 bg-dark text-white p-4 rounded">
          {/* Email */}
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              data-testid="email-input"
              type="email"
              name="email"
              value={ form.email }
              onChange={ handleChange }
              className="form-control bg-secondary text-white"
            />
          </div>

          {/* Password */}
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ form.password }
              onChange={ handleChange }
              className="form-control bg-secondary text-white"
            />
          </div>

          {/* Mensagem de erro */}
          {form.error && <p className="text-danger">{form.error}</p>}

          {/* Botão Submit */}
          <div className="col-12">
            <button
              type="submit"
              onClick={ handleSubmit }
              disabled={ !valid }
              className="btn btn-primary w-100"
            >
              Entrar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Login;

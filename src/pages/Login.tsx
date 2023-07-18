function Login() {
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
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            data-testid="password-input"
            type="password"
            name="password"
          />

          {/* Botão Submit */}
          <button type="submit">Entrar</button>
        </form>
      </main>
    </>
  );
}

export default Login;

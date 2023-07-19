import { useSelector } from 'react-redux';
import { RootState } from '../type';
import WalletForm from './WalletForm';

function Header() {
  const { user } = useSelector((state: RootState) => state);

  return (
    <>
      <header>
        <h1>Wallet</h1>

        {/* Info do Usuario */}
        <div>
          {/* Email */}
          <div>
            <span>Email: </span>
            <span data-testid="email-field">{user.email}</span>
          </div>

          {/* Saldo */}
          <div>
            <span>Saldo: </span>
            <span data-testid="total-field">{user.money}</span>
            <span data-testid="header-currency-field">{user.currencyExchange}</span>
          </div>
        </div>
      </header>

      {/* Formulario de Adicionar Despesa */}
      <WalletForm />
    </>
  );
}

export default Header;

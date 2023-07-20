import { useSelector } from 'react-redux';
import { CurrencyData, RootState } from '../type';
import WalletForm from './WalletForm';

function Header() {
  const { user, wallet } = useSelector((state: RootState) => state);
  const { expenses } = wallet;

  // Calcula o total de despesas
  const totalExpenses = expenses.reduce((acc, curr) => {
    const { currency } = curr;
    const exchangeRates = wallet
      .currenciesInf[currency as keyof typeof wallet.currenciesInf] as CurrencyData;
    const valueInBRL = Number(exchangeRates.ask) * Number(curr.value);

    return acc + valueInBRL;
  }, 0);

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

          {/* Despesas */}
          <div>
            <span>Despesas: </span>
            <span data-testid="total-field">
              {`${(Math.round(totalExpenses * 100) / 100).toFixed(2)}`}
            </span>
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

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
    <header className="bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="m-0">Wallet</h1>
        <button
          type="button"
          className="btn btn-outline-light"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Adicionar despesa
        </button>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <span>Email: </span>
          <span data-testid="email-field">{user.email}</span>
        </div>
        <div>
          <span>Despesas: </span>
          <span data-testid="total-field" className="text-warning">
            {`${(Math.round(totalExpenses * 100) / 100).toFixed(2)}`}
          </span>
          <span data-testid="header-currency-field">{user.currencyExchange}</span>
        </div>
      </div>
      <WalletForm />
    </header>
  );
}

export default Header;

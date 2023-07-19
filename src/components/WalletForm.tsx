import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';
import { Dispatch, RootState } from '../type';

function WalletForm() {
  const { wallet } = useSelector((state:RootState) => state);
  const dispatch: Dispatch = useDispatch();

  const fetchCurrenciesAPI = async () => {
    await dispatch(fetchCurrencies());
  };

  useEffect(() => {
    fetchCurrenciesAPI();
  }, []);

  return (
    <form>
      {/* Campo para adicionar despesa */}
      <label htmlFor="expense-input">
        Valor:
        <input
          type="number"
          data-testid="value-input"
        />
      </label>

      {/* Campo para descrição */}
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          data-testid="description-input"
        />
      </label>

      {/* Campo para selecionar moeda */}
      <label htmlFor="currency-input">
        Moeda:
        <select id="currency-input" data-testid="currency-input">
          {wallet.currencies.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default WalletForm;

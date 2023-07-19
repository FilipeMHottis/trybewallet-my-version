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
        <select data-testid="currency-input">
          {wallet.currencies.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>
          ))}
        </select>
      </label>

      {/* Campo de Pagamento */}
      <label htmlFor="payment-input">
        Método de pagamento:
        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      {/* Campo de Categoria */}
      <label htmlFor="category-input">
        Categoria:
        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      {/* Botão Submit */}
      <button type="button">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;

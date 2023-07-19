import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, expenses } from '../redux/actions';
import { Dispatch, RootState } from '../type';

const initialState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação ',
};

function WalletForm() {
  const { wallet } = useSelector((state:RootState) => state);
  const dispatch: Dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const fetchCurrenciesAPI = async () => {
    await dispatch(fetchCurrencies());
  };
  const buttonSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // dispatch(expenses());
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
          name="value"
          onChange={ handleChange }
          data-testid="value-input"
        />
      </label>

      {/* Campo para descrição */}
      <label htmlFor="description-input">
        Descrição:
        <input
          type="text"
          name="description"
          onChange={ handleChange }
          data-testid="description-input"
        />
      </label>

      {/* Campo para selecionar moeda */}
      <label htmlFor="currency-input">
        Moeda:
        <select onChange={ handleSelect } name="currency" data-testid="currency-input">
          {wallet.currencies.map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>

      {/* Campo de Pagamento */}
      <label htmlFor="payment-input">
        Método de pagamento:
        <select name="method" onChange={ handleSelect } data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      {/* Campo de Categoria */}
      <label htmlFor="category-input">
        Categoria:
        <select name="tag" onChange={ handleSelect } data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      {/* Botão Submit */}
      <button onClick={ buttonSubmit } type="button">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;

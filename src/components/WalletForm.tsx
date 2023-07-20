import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, expenses } from '../redux/actions';
import { Dispatch, RootState, CurrencyData } from '../type';

const initialState = {
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  valueInBRL: 0,
};

function WalletForm() {
  // Redux
  const dispatch: Dispatch = useDispatch();

  // Estados
  const { wallet } = useSelector((state:RootState) => state);
  const [form, setForm] = useState(initialState);

  // Handles Change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Fetch Currencies
  const fetchCurrenciesAPI = async () => {
    await dispatch(fetchCurrencies());
  };

  const addExpense = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // Retira o comportamento padrão do botão
    event.preventDefault();

    // Colocar o valor em BRL
    const { value, currency } = form;
    const currencyValue = wallet
      .currencies[currency as keyof typeof wallet.currencies] as CurrencyData;
    const valueInBRL = Number(value) * Number(currencyValue.ask);

    // Adicionar a despesa
    const formNew = {
      ...form,
      id: wallet.expenses.length,
      valueInBRL,
    };

    // Adicionar a despesa no estado
    dispatch(expenses(formNew));

    // Limpar o formulario
    setForm(initialState);
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
          value={ form.value }
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
          value={ form.description }
          data-testid="description-input"
        />
      </label>

      {/* Campo para selecionar moeda */}
      <label htmlFor="currency-input">
        Moeda:
        <select
          onChange={ handleSelect }
          name="currency"
          data-testid="currency-input"
          value={ form.currency }
        >
          {Object.keys(wallet.currencies).map((currency) => (
            <option key={ currency } value={ currency }>
              {currency}
            </option>
          ))}
        </select>
      </label>

      {/* Campo de Pagamento */}
      <label htmlFor="payment-input">
        Método de pagamento:
        <select
          name="method"
          onChange={ handleSelect }
          data-testid="method-input"
          value={ form.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      {/* Campo de Categoria */}
      <label htmlFor="category-input">
        Categoria:
        <select
          name="tag"
          onChange={ handleSelect }
          data-testid="tag-input"
          value={ form.tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      {/* Botão Submit */}
      <button onClick={ addExpense } type="button">Adicionar despesa</button>
    </form>
  );
}

export default WalletForm;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrencies, expenses } from '../redux/actions';
import { Dispatch, RootState } from '../type';

const initialState = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
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

    // Fetch Currencies
    dispatch(fetchCurrencies());

    // Adicionar a despesa
    const formNew = {
      ...form,
      id: wallet.expenses.length,
      exchangeRates: wallet.currenciesInf,
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
      <div className="form-group row px-3 py-2">
        <label
          htmlFor="expense-input"
          className="col-sm-1 col-form-label"
        >
          Valor:
        </label>
        <div className="col-sm-4">
          <input
            type="number"
            name="value"
            onChange={ handleChange }
            value={ form.value }
            data-testid="value-input"
            className="form-control"
          />
        </div>

        {/* Campo para descrição */}
        <label
          htmlFor="description-input"
          className="col-sm-1 col-form-label"
        >
          Descrição:
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            name="description"
            onChange={ handleChange }
            value={ form.description }
            data-testid="description-input"
            className="form-control"
          />
        </div>
      </div>

      {/* Campo para selecionar moeda */}
      <div className="form-group row px-3 py-2">
        <label
          htmlFor="currency-input"
          className="col-sm-1 col-form-label"
        >
          Moeda:
        </label>
        <div className="col-sm-4">
          <select
            onChange={ handleSelect }
            name="currency"
            data-testid="currency-input"
            value={ form.currency }
            className="form-select"
          >
            {(wallet.currencies).map((currency) => (
              <option key={ currency } value={ currency }>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de Pagamento */}
        <label
          htmlFor="payment-input"
          className="col-sm-1 col-form-label"
        >
          Método de pagamento:
        </label>
        <div className="col-sm-4">
          <select
            name="method"
            onChange={ handleSelect }
            data-testid="method-input"
            value={ form.method }
            className="form-select"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>
      </div>

      {/* Campo de Categoria */}
      <div className="form-group row px-3 py-2">
        <label
          htmlFor="category-input"
          className="col-sm-1 col-form-label"
        >
          Categoria:
        </label>
        <div className="col-sm-4">
          <select
            name="tag"
            onChange={ handleSelect }
            data-testid="tag-input"
            value={ form.tag }
            className="form-select"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>

        {/* Botão Submit */}
        <div className="col-sm-5 offset-sm-0">
          <button
            onClick={ addExpense }
            type="button"
            className="btn btn-primary btn-block w-100"
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    </form>
  );
}

export default WalletForm;

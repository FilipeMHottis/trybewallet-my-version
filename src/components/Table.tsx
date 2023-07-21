import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, Expense, CurrencyData } from '../type';

function Table() {
  const wallet = useSelector((state: RootState) => state.wallet);
  const { expenses } = wallet;
  const [array, setArray] = useState<Expense[] | []>([]);

  useEffect(() => {
    if (expenses) {
      setArray(Object.values(expenses));
    }
  }, [expenses]);

  const expenseRadio = (expense: Expense) => {
    const { currency } = expense;
    const exchangeRates = wallet
      .currenciesInf[currency as keyof typeof wallet.currenciesInf] as CurrencyData;
    return exchangeRates;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {array.map((item: Expense) => (
          <tr key={ item.id }>
            <td>{ item.description }</td>
            <td>{ item.tag }</td>
            <td>{ item.method }</td>
            <td>{ Math.round((Number(item.value) * 100) / 100).toFixed(2) }</td>
            <td>{ expenseRadio(item).name }</td>
            <td>{ Number(expenseRadio(item).ask).toFixed(2) }</td>
            <td>{ (Number(item.value) * Number(expenseRadio(item).ask)).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button type="button">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;

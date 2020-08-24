import React, { useContext } from 'react';
import { GlobalContext } from  '../contexts/globalState';

export const IncomeExpense = () => {
  const {transactions} = useContext(GlobalContext);
  const incomeTotal = transactions
                        .filter(transaction => transaction.amount >= 0)
                        .reduce((sum, el) => sum += el.amount, 0)
                        .toFixed(2);

  const expenseTotal = (transactions
                         .filter(transaction => transaction.amount < 0)
                         .reduce((sum, el) => sum += el.amount, 0) * -1
                       ).toFixed(2)

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${incomeTotal}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${expenseTotal}</p>
      </div>
    </div>
  )
}

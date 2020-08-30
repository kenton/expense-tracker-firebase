import React, { useContext } from 'react';

export const Transaction = ({transaction}) => {
  // const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? '-' : '+';
  const transactionClass = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li className={transactionClass}>
      {transaction.description} <span>{sign}${Math.abs(transaction.amount)}</span>
      <button onClick={()=>{}}className="delete-btn">x</button>
    </li>
  )
}

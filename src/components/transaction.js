import React from 'react';
import { firestore } from '../firebase';

export const Transaction = ({transaction}) => {
  const transactionDoc = firestore.collection('transactions').doc(transaction.id);

  const deleteTransaction = () => transactionDoc.delete();


  const sign = transaction.amount < 0 ? '-' : '+';
  const transactionClass = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li className={transactionClass}>
      {transaction.description} <span>{sign}${Math.abs(transaction.amount)}</span>
      <button onClick={()=>{deleteTransaction(transaction.id)}} className="delete-btn">x</button>
    </li>
  )
}

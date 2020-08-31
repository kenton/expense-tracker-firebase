import React, { useContext } from 'react';
import { AppContext } from '../app';
import { firestore } from '../firebase';

export const Transaction = ({transaction}) => {
  const { transactions, setTransactions } = useContext(AppContext);

  const deleteTransaction = async transactionId => {
    setTransactions(transactions.filter(transaction => transaction.id !== transactionId));
    await firestore.collection('transactions').doc(transactionId).delete();
  }

  const sign = transaction.amount < 0 ? '-' : '+';
  const transactionClass = transaction.amount < 0 ? 'minus' : 'plus';

  return (
    <li className={transactionClass}>
      {transaction.description} <span>{sign}${Math.abs(transaction.amount)}</span>
      <button onClick={()=>{deleteTransaction(transaction.id)}} className="delete-btn">x</button>
    </li>
  )
}

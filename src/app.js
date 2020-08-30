import React, {useEffect, useState, createContext} from 'react';
import './app.css';
import {firestore} from './firebase';

import {Header} from './components/header';
import {Balance} from './components/balance';
import {IncomeExpense} from './components/incomeExpense';
import {TransactionList} from './components/transactionList';
import {AddTransaction} from './components/addTransaction';
import { collectIdsAndDocs } from './utils';

export const AppContext = createContext({
  transactions: [],
  setTransactions: null
});

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const snapshot = await firestore.collection('transactions').get();

      const transactions = snapshot.docs.map(collectIdsAndDocs);

      setTransactions(transactions);
      console.log(transactions);
    }

    fetchTransactions();
  }, [transactions]);

  return (
    <AppContext.Provider value={{
      transactions,
      setTransactions
    }}>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </AppContext.Provider>
  );
}

export default App;

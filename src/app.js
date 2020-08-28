import React, {useEffect} from 'react';
import './app.css';
import {firestore} from './firebase';

import {Header} from './components/header';
import {Balance} from './components/balance';
import {IncomeExpense} from './components/incomeExpense';
import {TransactionList} from './components/transactionList';
import {AddTransaction} from './components/addTransaction';

import { GlobalProvider } from './contexts/globalState';

function App() {
  useEffect(() => {
    async function fetchTransactions() {
      const snapshot = await firestore.collection('transactions').get();
      const data = snapshot.docs.map(doc => doc.data());
      console.log(data);
    }

    fetchTransactions();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;

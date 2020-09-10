import React, { useEffect, useState, createContext } from "react";
import "./app.css";
import { firestore, auth } from "./firebase";
import { collectIdsAndDocs } from "./utils";

import { Header } from "./components/header";
import { Balance } from "./components/balance";
import { IncomeExpense } from "./components/incomeExpense";
import { TransactionList } from "./components/transactionList";
import { AddTransaction } from "./components/addTransaction";
import { Authentication } from "./components/authentication/";

export const AppContext = createContext({
  transactions: [],
  setTransactions: null,
  currentUser: null,
});

function App() {
  const [transactions, setTransactions] = useState([]);
  // const [unsubscribeFromFirestore, setUnsubscribeFromFirestore] = useState(null);
  // const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authUnsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => authUnsubscribe();
  }, [transactions, currentUser]);

  useEffect(() => {
    let firestoreUnsubscribe;
    let fetchTransactions;

    if (currentUser) {
      fetchTransactions = async () => {
        firestoreUnsubscribe = await firestore
          .collection("transactions")
          .where("user.id", "==", currentUser.uid)
          .onSnapshot((snapshot) => {
            const allTransactions = snapshot.docs.map(collectIdsAndDocs);
            setTransactions(allTransactions);
          });
      };
    } else {
      fetchTransactions = async () => {
        firestoreUnsubscribe = await firestore.collection("transactions").onSnapshot((snapshot) => {
          const allTransactions = snapshot.docs.map(collectIdsAndDocs);
          setTransactions(allTransactions);
        });
      };
    }

    fetchTransactions();

    return () => firestoreUnsubscribe();
  }, [transactions, currentUser]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        currentUser,
      }}
    >
      <Header />
      <div className="container">
        <Authentication user={currentUser} />
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </AppContext.Provider>
  );
}

export default App;

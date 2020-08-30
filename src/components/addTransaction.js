import React, {useState, useContext, useEffect} from 'react';
import { AppContext } from '../app';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils';

export const AddTransaction = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const { transactions, setTransactions } = useContext(AppContext);

  // useEffect(() => {
  //   setDescription("");
  //   setAmount(0);
  //   debugger;

  // }, [transactions]);

  const addTransaction = async transaction => {
    const docRef = await firestore.collection('transactions').add(transaction);
    const doc = await docRef.get();
    const newTransaction = collectIdsAndDocs(doc);

    setTransactions([newTransaction, ...transactions]);
    setDescription("");
    setAmount(0);
  }

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount: +amount
    }

    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Text</label>
          <input type="description" value={description} onChange={(e) => {setDescription(e.target.value)}} id="description" placeholder="Enter description..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input type="number" value={amount} onChange={(e) => {setAmount(e.target.value)}} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}

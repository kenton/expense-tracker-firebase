import React, { useState, useContext } from "react";
import { firestore } from "../firebase";
import { AppContext } from "../app";

export const AddTransaction = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const { currentUser } = useContext(AppContext);

  // FIXME: Consider renaming this as it's confusing since this component has the same name
  const addTransaction = async (transaction) => {
    await firestore.collection("transactions").add(transaction);

    // TODO: Can't this part be done as part of a useEffect?
    setDescription("");
    setAmount(0);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { uid, displayName, email, photoUrl } = currentUser;

    const newTransaction = {
      description,
      amount: +amount,
      user: {
        id: uid,
        name: displayName,
        email,
      },
    };

    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="description">Text</label>
          <input
            type="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            id="description"
            placeholder="Enter description..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

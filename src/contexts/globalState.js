import React, { createContext, useReducer } from 'react';
import AppReducer from './appReducer';

// initial state

const initialState = {
  transactions: []
}

// create context
export const GlobalContext = createContext(initialState);

/**
 * provider component
 * this component is going to wrap our other components, so we're passing in 'children' as a prop
 * here to use within this function.
 *  */
export const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    })
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

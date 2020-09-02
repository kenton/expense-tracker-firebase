import React from "react";

import CurrentUser from "./currentUser";
import SignInAndSignUp from "./signInAndSignUp";

export const Authentication = ({ user, loading }) => {
  if (loading) return null;
  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

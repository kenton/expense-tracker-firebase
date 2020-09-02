import React, { useState } from "react";
import { signInWithGoogle } from "../../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmail("");
    setPassword("");
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn">Sign In</button>

      <button className="btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </form>
  );
};

export default SignIn;

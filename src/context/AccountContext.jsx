import React, { createContext, useEffect, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [confirmationCodeModalOpen, setConfirmationCodeModalOpen] =
    useState(false);
  const [loggedInModalOpen, setLoggedInModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") !== null
      ? JSON.parse(localStorage.getItem("loggedIn"))
      : false
  );

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <AccountContext.Provider
      value={{
        signInModalOpen,
        setSignInModalOpen,
        signUpModalOpen,
        setSignUpModalOpen,
        confirmationCodeModalOpen,
        setConfirmationCodeModalOpen,
        loggedInModalOpen,
        setLoggedInModalOpen,
        email,
        setEmail,
        password,
        setPassword,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

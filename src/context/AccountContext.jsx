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
  const [firstName, setFirstName] = useState(
    localStorage.getItem("firstName") !== null
      ? JSON.parse(localStorage.getItem("firstName"))
      : ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("lastName") !== null
      ? JSON.parse(localStorage.getItem("lastName"))
      : ""
  );

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem("firstName", JSON.stringify(firstName));
  }, [firstName]);

  useEffect(() => {
    localStorage.setItem("lastName", JSON.stringify(lastName));
  }, [lastName]);

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
        firstName,
        setFirstName,
        lastName,
        setLastName,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

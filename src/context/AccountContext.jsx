import React, { createContext, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [confirmationCodeModalOpen, setConfirmationCodeModalOpen] =
    useState(false);
  const [loggedInModalOpen, setLoggedInModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

import React, { createContext, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [confirmationCodeModalOpen, setConfirmationCodeModalOpen] = useState(false);
  console.log(confirmationCodeModalOpen)
  return (
    <AccountContext.Provider
      value={{
        signInModalOpen,
        setSignInModalOpen,
        signUpModalOpen,
        setSignUpModalOpen,
        confirmationCodeModalOpen,
        setConfirmationCodeModalOpen
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

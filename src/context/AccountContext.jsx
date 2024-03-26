import React, { createContext, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  return (
    <AccountContext.Provider
      value={{
        signInModalOpen,
        setSignInModalOpen,
        signUpModalOpen,
        setSignUpModalOpen,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

import React, { createContext, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  return (
    <AccountContext.Provider value={{ accountModalOpen, setAccountModalOpen }}>
      {children}
    </AccountContext.Provider>
  );
};

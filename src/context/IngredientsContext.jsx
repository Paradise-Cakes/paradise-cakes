import React, { createContext, useState } from "react";
export const IngredientsContext = createContext();

export const IngredientsProvider = ({ children }) => {
  const [ingredientsOpen, setIngredientsOpen] = useState(false);

  return (
    <IngredientsContext.Provider
      value={{ ingredientsOpen, setIngredientsOpen }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};

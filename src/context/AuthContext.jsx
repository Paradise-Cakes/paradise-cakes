import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
        console.log("User is authenticated");

        // Check if the user belongs to the 'Admin' group
        const session = await fetchAuthSession();
        const groups =
          session.tokens?.accessToken?.payload["cognito:groups"] || [];

        if (groups.includes("admins")) {
          setIsAdmin(true);
          console.log("User is admin");
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
    checkAuth();

    // Listen for any 'auth' events
    const unsubscribe = Hub.listen("auth", () => {
      console.log("Auth state changed. Re-checking authentication status...");
      checkAuth();
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

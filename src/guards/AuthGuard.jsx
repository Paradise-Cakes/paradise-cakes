import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useModalStore } from "../store/useModalStore";
import Home from "../components/home/Home";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { openSignInModal, closeSignInModal } = useModalStore();

  useEffect(() => {
    if (!isAuthenticated) {
      openSignInModal();
    } else {
      closeSignInModal();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Home />;
};

export default ProtectedRoute;

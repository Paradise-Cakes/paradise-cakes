import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useModalStore } from "../store/useModalStore";
import Home from "../components/home/Home";
import NotFound from "../components/NotFound";

export const ProtectedUserRoute = () => {
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

export const ProtectedAdminRoute = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return isAuthenticated && isAdmin && <Outlet />;
};

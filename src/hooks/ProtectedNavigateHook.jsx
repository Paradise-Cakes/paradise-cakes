import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useModalStore } from "../store/useModalStore";

export const useProtectedNavigate = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { openSignInModal } = useModalStore();
  const navigate = useNavigate();

  return (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      openSignInModal();
    }
  };
};

export const useProtectedAdminNavigate = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const { openSignInModal } = useModalStore();
  const navigate = useNavigate();

  return (path) => {
    if (isAuthenticated && isAdmin) {
      navigate(path);
    } else {
      openSignInModal();
    }
  };
};

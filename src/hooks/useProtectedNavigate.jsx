import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useModalStore } from "../store/useModalStore";

const useProtectedNavigate = () => {
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

export default useProtectedNavigate;

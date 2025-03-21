import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Modal,
  useTheme,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import SignUpForm from "../../forms/auth/SignUpForm";
import { useModalStore } from "../../../store/useModalStore";

export default function SignUpModal() {
  const theme = useTheme();
  const {
    signUpModalOpen,
    openSignUpModal,
    closeSignUpModal,
    openSignInModal,
  } = useModalStore();
  const toggleSignUpModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open ? openSignUpModal() : closeSignUpModal();
  };

  return (
    <Modal
      open={signUpModalOpen}
      onClose={toggleSignUpModal(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "420px",
          height: "fit-content",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid black",
          padding: "2.5rem",
          position: "relative",
        }}
      >
        <Box>
          <CgClose
            style={{
              height: "24px",
              width: "24px",
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              cursor: "pointer",
            }}
            onClick={toggleSignUpModal(false)}
          />
          <Typography variant="h5" textAlign={"center"} fontWeight={1000}>
            CREATE AN ACCOUNT
          </Typography>
          <SignUpForm />
          <Typography sx={{ textAlign: "center", fontSize: "1rem" }}>
            Already have an account?{" "}
            <span
              style={{ fontWeight: "800", cursor: "pointer" }}
              onClick={() => {
                closeSignUpModal();
                openSignInModal();
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

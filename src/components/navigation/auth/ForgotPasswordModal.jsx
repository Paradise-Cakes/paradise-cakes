import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Modal,
  useTheme,
  Snackbar,
  Alert,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import { useModalStore } from "../../../store/useModalStore";
import ForgotPasswordForm from "../../forms/auth/ForgotPasswordForm";

export default function ForgotPasswordModal() {
  const theme = useTheme();
  const {
    forgotPasswordModalOpen,
    closeForgotPasswordModal,
    openForgotPasswordModal,
    openSignInModal,
  } = useModalStore();

  const toggleForgotPasswordModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open ? openForgotPasswordModal() : closeForgotPasswordModal();
  };

  return (
    <Modal
      open={forgotPasswordModalOpen}
      onClose={toggleForgotPasswordModal(false)}
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
          padding: "3rem",
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
            onClick={toggleForgotPasswordModal(false)}
          />
          <Box>
            <Typography variant="h5" fontWeight={1000} textAlign={"center"}>
              FORGOT PASSWORD?
            </Typography>
            <Typography
              variant="body1"
              textAlign={"center"}
              sx={{ marginTop: "1rem" }}
            >
              Enter your email address below and we'll send you a link to reset
              your password.
            </Typography>
            <ForgotPasswordForm />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "800", textAlign: "center", cursor: "pointer" }}
              onClick={() => {
                closeForgotPasswordModal();
                openSignInModal();
              }}
            >
              Back to sign in
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

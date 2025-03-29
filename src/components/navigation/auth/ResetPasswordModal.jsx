import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { CgClose } from "react-icons/cg";
import { useModalStore } from "../../../store/useModalStore";
import ResetPasswordForm from "../../forms/auth/ResetPasswordForm";

export default function ResetPasswordModal() {
  const {
    resetPasswordParams,
    resetPasswordModalOpen,
    openResetPasswordModal,
    closeResetPasswordModal,
  } = useModalStore();

  const toggleResetPasswordModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open ? openResetPasswordModal() : closeResetPasswordModal();
  };

  return (
    <Modal
      open={resetPasswordModalOpen}
      onClose={toggleResetPasswordModal(false)}
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
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={toggleResetPasswordModal(false)}
          />
          <Typography variant="h5" textAlign={"center"}>
            Set New Password
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{ marginTop: "1rem" }}
          >
            Enter your new password below.
          </Typography>
          <ResetPasswordForm
            username={resetPasswordParams?.username}
            code={resetPasswordParams?.code}
          />
        </Box>
      </Box>
    </Modal>
  );
}

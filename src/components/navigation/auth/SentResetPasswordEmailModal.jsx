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
import LoadingButton from "../../extras/LoadingButton";

export default function ForgotPasswordModal() {
  const theme = useTheme();
  const {
    closeSentResetPassswordEmailModal,
    sentResetPassswordEmailModalOpen,
  } = useModalStore();

  const toggleSentResetPassswordEmailModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    closeSentResetPassswordEmailModal();
  };

  return (
    <Modal
      open={sentResetPassswordEmailModalOpen}
      onClose={toggleSentResetPassswordEmailModal(false)}
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
            onClick={toggleSentResetPassswordEmailModal(false)}
          />
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Email Sent
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Please check your email to reset your password.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              height: "45px",
              textTransform: "none",
              fontSize: "1rem",
            }}
            onClick={toggleSentResetPassswordEmailModal(false)}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

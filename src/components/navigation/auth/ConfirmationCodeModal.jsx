import React, { useContext } from "react";
import { Container, Box, Typography, useTheme, Modal } from "@mui/material";
import { CgClose } from "react-icons/cg";
import ConfirmationCodeForm from "../../forms/auth/ConfirmationCodeForm";
import { usePostResendConfirmationCode } from "../../../hooks/auth/AuthHook";
import { useModalStore } from "../../../store/useModalStore";
import { useAuthStore } from "../../../store/useAuthStore";

export default function ConfirmationCodeModal() {
  const theme = useTheme();
  const {
    openConfirmationCodeModal,
    closeConfirmationCodeModal,
    confirmationCodeModalOpen,
  } = useModalStore();
  const { email } = useAuthStore();

  const postResendConfirmationCodeQuery = usePostResendConfirmationCode();
  const {
    mutateAsync: postResendConfirmationCode,
    isLoading: isPostResendConfirmationCodeLoading,
    error: postResendConfirmationCodeError,
  } = postResendConfirmationCodeQuery;

  const toggleConfirmationCodeModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open ? openConfirmationCodeModal() : closeConfirmationCodeModal();
  };

  return (
    <Modal
      open={confirmationCodeModalOpen}
      onClose={toggleConfirmationCodeModal(false)}
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
            onClick={toggleConfirmationCodeModal(false)}
          />
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={1000}
            sx={{ marginBottom: "1rem" }}
          >
            VERIFICATION
          </Typography>
          <Typography variant="body2" textAlign="center">
            We sent a code to your email. Please enter it below to continue.
          </Typography>
          <ConfirmationCodeForm />
          <Typography variant="body2" marginTop={"1rem"} textAlign={"center"}>
            Didn't receive a code?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={async () => {
                try {
                  await postResendConfirmationCode({
                    username: email,
                  });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Click to resend
            </span>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

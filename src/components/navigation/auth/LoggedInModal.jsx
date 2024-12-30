import React, { useContext } from "react";
import { Box, Button, Typography, Modal, useTheme } from "@mui/material";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../../store/useModalStore";
import useProtectedNavigate from "../../../hooks/useProtectedNavigate";

export default function LoggedInModal() {
  const { loggedInModalOpen, closeLoggedInModal, openLoggedInModal } =
    useModalStore();

  const protectedNavigate = useProtectedNavigate();
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleLoggedInModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    open ? openLoggedInModal() : closeLoggedInModal();
  };

  return (
    <Modal
      open={loggedInModalOpen}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={toggleLoggedInModal(false)}
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
        <CgClose
          style={{
            height: "24px",
            width: "24px",
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            cursor: "pointer",
          }}
          onClick={toggleLoggedInModal(false)}
        />
        <Typography variant="h5" fontWeight={1000} textAlign={"center"}>
          YOU'RE LOGGED IN!
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
          You can either close this and continue to shop, or go to your account
          dashboard.
        </Typography>
        <Button
          variant="contained"
          fullWidth
          color="dark"
          sx={{
            marginTop: "1rem",
            height: "45px",
            fontWeight: "800",
          }}
          onClick={toggleLoggedInModal(false)}
        >
          CLOSE
        </Button>
        <Button
          onClick={() => {
            closeLoggedInModal();
            protectedNavigate("/account");
          }}
          variant="outlined"
          fullWidth
          color="primary"
          sx={{
            marginTop: "1rem",
            height: "45px",
            backgroundColor: "white",
            fontWeight: "800",
            "&:hover": {
              backgroundColor: "white",
              color: theme.palette.primary.main,
            },
          }}
        >
          GO TO MY DASHBOARD
        </Button>
      </Box>
    </Modal>
  );
}

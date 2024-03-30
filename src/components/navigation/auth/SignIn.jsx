import React, { useContext } from "react";
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
import { AccountContext } from "../../../context/AccountContext";
import { CgClose } from "react-icons/cg";
import SignInForm from "../../forms/auth/SignInForm";

export default function SignIn() {
  const theme = useTheme();
  const { signInModalOpen, setSignInModalOpen, setSignUpModalOpen } =
    useContext(AccountContext);
  const toggleSignInModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSignInModalOpen(open);
  };

  return (
    <Modal
      open={signInModalOpen}
      onClose={toggleSignInModal(false)}
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
            onClick={toggleSignInModal(false)}
          />
          <Typography variant="h5" textAlign={"center"} fontWeight={1000}>
            SIGN IN
          </Typography>
          <SignInForm />
          <Typography sx={{ fontWeight: "800", textAlign: "center" }}>
            Forgot your password?
          </Typography>
          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.dark.main}`,
              width: "98%",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          />
          <Typography variant="h5" textAlign={"center"} fontWeight={1000}>
            SIGN UP
          </Typography>
          <Typography
            variant="body2"
            textAlign={"center"}
            fontSize={"1rem"}
            marginTop={"1rem"}
            marginBottom={"1rem"}
          >
            Create an account to place an order, receive the latest updates, and
            access order history.
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              height: "45px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "800",
              marginTop: "1rem",
            }}
            onClick={() => {
              setSignInModalOpen(false);
              setSignUpModalOpen(true);
            }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

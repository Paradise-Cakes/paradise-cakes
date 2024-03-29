import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Modal,
  useTheme,
} from "@mui/material";
import { AccountContext } from "../../../context/AccountContext";
import { CgClose } from "react-icons/cg";
import SignUpForm from "../../forms/auth/SignUpForm";

export default function SignUp() {
  const theme = useTheme();
  const { signUpModalOpen, setSignUpModalOpen, setSignInModalOpen } =
    useContext(AccountContext);
  const toggleSignUpModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSignUpModalOpen(open);
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
          height: "450px",
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
                setSignUpModalOpen(false);
                setSignInModalOpen(true);
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

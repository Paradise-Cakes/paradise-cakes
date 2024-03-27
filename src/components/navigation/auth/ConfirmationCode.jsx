import React, { useContext } from "react"
import {
	Container,
	Box,
	Typography,
	useTheme,
	Modal
} from "@mui/material"
import { AccountContext } from "../../../context/AccountContext";
import { CgClose } from "react-icons/cg";
import ConfirmationCodeForm from "../../forms/auth/ConfirmationCodeForm"

export default function ConfirmationCode() {
	const theme = useTheme();
	const { confirmationCodeModalOpen, setConfirmationCodeModalOpen } = useContext(AccountContext);

	const toggleConfirmationCodeModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setConfirmationCodeModalOpen(open);
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
          height: "200px",
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
  				<Typography variant="h5" textAlign="center" fontWeight={1000} sx={{marginBottom: "1rem"}}>
  					VERIFICATION
  				</Typography>
  				<Typography variant="body2" textAlign="center">
  					Please verify the code that was sent to your email.
  				</Typography>
  				<ConfirmationCodeForm />
  			</Box>
  		</Box>
  	</Modal>
  )
}
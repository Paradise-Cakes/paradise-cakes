import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

export default function LoadingButton({ isLoading, isDisabled=false, children, fullWidth=true }) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isLoading || isDisabled}
      fullWidth={fullWidth}
      sx={{
        height: "45px",
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: "800",
        marginTop: "1rem",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "800",
          }}
        >
          <CircularProgress size={24} color="inherit" />
        </Box>
      ) : (
        children
      )}
    </Button>
  );
}

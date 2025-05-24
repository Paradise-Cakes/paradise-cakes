import React from "react";
import PropTypes from "prop-types";

import { Box, Button, CircularProgress } from "@mui/material";

export default function LoadingButton({
  isLoading,
  isDisabled = false,
  label,
  fullWidth = true,
}) {
  return (
    <Button
      data-testid="create-edit-submit-button"
      type="submit"
      variant="contained"
      color="primary"
      disabled={isLoading || isDisabled}
      fullWidth={fullWidth}
      sx={{
        height: "45px",
        textTransform: "none",
        fontSize: "1rem",
        marginTop: "1rem",
        marginBottom: "2rem",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            data-testid="loading-button"
            size={24}
            color="inherit"
          />
        </Box>
      ) : (
        label
      )}
    </Button>
  );
}

LoadingButton.propTypes = {
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

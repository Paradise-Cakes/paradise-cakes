import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  banner: {
    position: "relative",
    height: "50px",
    overflow: "hidden",
    backgroundColor: theme.palette.dark.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.5s ease-in-out",
    transform: "translateY(100%)",
    color: "white",
  },
  messageEnter: {
    transform: "translateY(0)",
  },
  messageExit: {
    transform: "translateY(-200%)",
  },
}));

export default function AnimatedBanner({ messages, cycleTime = 5000 }) {
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, cycleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box className={classes.banner}>
      {messages.map((message, idx) => (
        <Typography
          key={idx}
          variant="h6"
          component="div"
          className={`${classes.message} ${
            idx === index
              ? classes.messageEnter
              : idx === (index - 1 + messages.length) % messages.length
              ? classes.messageExit
              : ""
          }`}
        >
          {message}
        </Typography>
      ))}
    </Box>
  );
}

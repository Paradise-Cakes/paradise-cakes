import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme } from "@mui/material";

export default function AnimatedBanner({ messages, cycleTime = 5000 }) {
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, cycleTime);

    return () => clearInterval(interval);
  }, [cycleTime, messages.length]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "50px",
        overflow: "hidden",
        backgroundColor: theme.palette.dark.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {messages.map((message, idx) => (
        <Typography
          key={idx}
          variant="h6"
          component="div"
          sx={{
            position: "absolute",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.5s ease-in-out",
            transform: "translateY(100%)",
            color: "white",
            ...(idx === index && {
              transform: "translateY(0)",
            }),
            ...(idx === (index - 1 + messages.length) % messages.length && {
              transform: "translateY(-200%)",
            }),
          }}
        >
          {message}
        </Typography>
      ))}
    </Box>
  );
}

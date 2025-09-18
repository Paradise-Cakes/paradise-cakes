import { Grid, useTheme } from "@mui/material";

import Logo from "../../assets/favicon.png";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const theme = useTheme();
  return (
    <footer style={{ position: "absolute", bottom: 0, width: "100%" }}>
      {/* <Grid
        container
        sx={{
          height: "100px",
          borderTop: "2px solid black",
          backgroundColor: `${theme.palette.warning.main}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <Grid item>
          <a
            href="https://www.instagram.com/megs.soup/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={24} />
          </a>
        </Grid>
        <Grid item>
          <img
            src={Logo}
            alt="Paradise Cakes logo"
            style={{
              width: "60px",
              height: "29px",
            }}
          />
        </Grid>
        <Grid item>
          <p>
            &copy; {new Date().getFullYear()} Paradise Cakes. All rights
            reserved.
          </p>
        </Grid>
      </Grid> */}
    </footer>
  );
}

import { Grid, useTheme } from "@mui/material";

import Logo from "../../assets/favicon.png";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const theme = useTheme();
  return (
    <footer>
      <Grid
        container
        sx={{
          height: "60px",
          borderTop: "2px solid black",
          marginTop: "10rem",
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
            style={{ width: "60px", height: "29px" }}
          />
        </Grid>
        <Grid item>
          <p>
            &copy; {new Date().getFullYear()} Paradise Cakes. All rights
            reserved.
          </p>
        </Grid>
      </Grid>
    </footer>
  );
}

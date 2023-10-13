import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Link, Typography } from "@mui/material";
import { Pinterest } from "@mui/icons-material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{ textAlign: "center", bgcolor: "blue", color: "white", p: 3 }}
      >
        <Box
          sx={{
            my: 3,
            "& svg": {
            fontSize: "60px",
            cursor: "pointer",
            mr: 2,
            },
            "& svg:hover": {
              color: "goldenrod",
              transform: "translateX(5px)",
              transition: "all 400ms",
            },
          }}
        > 
        <Link href="https://www.twitter.com/" underline="none">
          <TwitterIcon /> 
        </Link>
        <Link href="https://www.facebook.com/" underline="none">
          <FacebookIcon />
        </Link>
        <Link href="https://youtube.com/" underline="none">
          <YouTubeIcon />
        </Link>
        <Link href="https://www.instagram.com" underline="none">
          <InstagramIcon />
        </Link>
        <Link href="https://www.pinterest.com/" underline="none">
          <Pinterest />
        </Link>
      </Box>
      <Typography
        variant="h6"
        sx={{
          "@media (max-width:600px)": {
          fontSize: "1rem",
          },
        }}
      >
      &copy; Online Shop. All rights reserved.
      </Typography>
    </Box>
    </>
  );
};

export default Footer;
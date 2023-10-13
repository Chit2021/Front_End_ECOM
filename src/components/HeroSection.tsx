import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Colors = {
    backColor: "#F7F5ED",
    white: "#fff",
    boxShadowInput: "rgba(0,0,0,.1)",
    borderButton: "#eaeaea",
    black: "#45423E",
    logoColor: "#e3893f",
    blue: "#7697f9",
    danger: "#d86f18",
    secondaryColor: "blue",
    hoverColor: "#a77020",
    bgFooter: "#72716f",
    orange: "#D3A863",
    blackMode: "#141A1F",
    borderRight: "#100b0b"
  };

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        backgroundImage: "url(/images/ecom.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        component="div"
        gutterBottom
        sx={{ color: Colors.black }}
      >
        Discover Amazing Products
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: Colors.black, fontSize: "25px" }}
      >
        Explore different types of Products and Services
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/products-page")}
        sx={{
          background: Colors.secondaryColor,
          "&:hover": {
            background: Colors.hoverColor, 
          },
        }}
      >
        Learn More
      </Button>
    </Box>
  );
};

export default HeroSection;
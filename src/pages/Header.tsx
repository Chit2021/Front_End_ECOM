import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Shop
          </Typography>
    
          <Button color="inherit" component={Link} to="/homepage">Home</Button>
          <Button color="inherit" component={Link} to="/products-page">Products</Button>
          <Button color="inherit" component = {Link} to="/login">Login</Button>
          <Button color="inherit" component = {Link} to="/cart">Cart</Button>
          <Button color="inherit" component = {Link} to="/admin_page">ADMIN_PAGE</Button>
          <Button color="inherit" component={Link} to="/contact">Contact Us</Button>
          {/* <Button color="inherit" component = {Link} to="/userprofile">User_Profile</Button> */}
         
        </Toolbar>
      </AppBar>
    </Box>
    
    
  );
}


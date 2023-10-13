import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AppState } from "../redux/store";
import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";

import { emptyCart } from "../redux/reducers/cartReducer";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { logout } from "../redux/reducers/usersReducer";

export default function LoginMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    navigate("/login");
  };
  //const { currentUser } = useAppSelector((state: AppState) => state.users);  //not working need to check why?
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        {/* {currentUser?.email} */}
        User
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

//NEED to import if i want to show logge din user menu

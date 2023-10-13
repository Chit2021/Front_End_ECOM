
import { Avatar, Box, Button, Grid, Link, Typography } from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom"

import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { logout } from "../redux/reducers/usersReducer"

export const UserProfile = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const profile = useAppSelector(state => state.usersReducer.users)

  const onLogout = () => {
    dispatch(logout())
    navigate(`/homepage`);
  }

  if (!profile) {
    return (
      <main>
        <Link component={RouterLink} to='/login'>Please log in</Link>
      </main>
    )
  }

  return (
    <main>
      <Box>
        <Typography variant='h4'>Welcome to Profile</Typography>
        <Grid container alignItems='center'>
          <Grid item xs={4}>
            {/* <Avatar src={profile.avatar} alt={profile.name} sx={{height: 'auto', width: 'auto'}}/> */}
          </Grid>
          <Grid item xs={8} sx={{padding: '3em'}}>
            <Typography>Name: </Typography>
            <Typography>Email address: </Typography>
            <Typography>Role: </Typography>
            {/* <Typography>Name: {profile.name}</Typography>
            <Typography>Email address: {profile.email}</Typography>
            <Typography>Role: {profile.role}</Typography> */}
            <Button onClick={onLogout}>Log out</Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  )
}
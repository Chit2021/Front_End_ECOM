//login using material ui
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import { authenticateUserAsync, loginUserAsync } from '../redux/reducers/usersReducer';
// import { Link } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Online_Shop
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {

  const [form, setForm] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({email: '', password: ''});
  const [open, setOpen] = useState(false);
  const [email,setEmail] = useState("")
  const [password ,setPassword]= useState("")

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleChange = (e:any) => {  //updates the form state when a user types into the fields.
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    });
  };

  const validate = () => {
    let isValid = true;
    let tempErrors = {email: '',password: ''};

    if (!form.email) {
      isValid = false;
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      isValid = false;
      tempErrors.email = 'Email is invalid';
    }

    if (!form.password) {
      isValid = false;
      tempErrors.password = 'Password is required';
    }

    setErrors(tempErrors);
    return isValid;
  };

  // const handleSubmit = (e:any) => {
  //   e.preventDefault();
  //   if (validate()) {
  //       // Continue login 
  //       dispatch(loginUserAsync({email:email,password:password}))
  //       navigate('/userprofile');
  //       setOpen(true);
  //       //navigate
  //   }
  // };//original
  const getUserData = (accessToken: string) => {
    localStorage.setItem('token', accessToken);
    dispatch(authenticateUserAsync(accessToken))
      .unwrap()
      .then(() => {
        navigate('/userProfile');
      })
      .catch((err) => {
        // setIsInfoTooltipOpen(true);
      })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUserAsync({ email, password }))
    .unwrap()
    .then((data) => {
      getUserData(data.access_token);
    })
    .catch((err) => {
      // setIsInfoTooltipOpen(true);
      navigate('/login')
    })
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const onLogin = (e:React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   dispatch(loginUserAsync({email,password}))
  // }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login For Online Shop
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={form.email}
              error={Boolean(errors.email)}
              helperText={errors.email} 
              onChange={handleChange}
             // onChange ={(e)=>setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={form.password} 
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
             // onChange ={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleSubmit}
            >
              Login
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Successfully logged in"
              action={
              <Button onClick={handleClose}>
                <Button color="secondary" size="small" onClick={handleClose}></Button>
                Close
              </Button>
               }
              />
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register Here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
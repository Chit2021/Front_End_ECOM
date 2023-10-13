import React, { useState } from 'react';
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
import { NewUser } from '../types/NewUser';
import useAppDispatch from '../hooks/useAppDispatch';
import { createUserAsync } from '../redux/reducers/usersReducer';
import { useNavigate } from 'react-router-dom';
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

export default function Register() {

  const [form, setForm] = useState({name: '',surname: '',email: '',password: '',confirmPassword: ''});
  const [errors, setErrors] = useState({name: '',surname: '',email: '',password: '',confirmPassword: ''});
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    });
  };

  const validate = () => {
    let isValid = true;
    let tempErrors = {name: '',surname: '',email: '',password: '',confirmPassword: ''};

    if (!form.name.trim()) {
      isValid = false;
      tempErrors.name = 'Name is required';
    }

    if (!form.surname.trim()) {
      isValid = false;
      tempErrors.surname = 'Surname is required';
    }

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

    if (form.password !== form.confirmPassword) {
      isValid = false;
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleRegisterClick = (e:any) => {
    e.preventDefault();
    if (validate()) {
      // registration process
      const createNew : NewUser = {
        name: e.name,
        email: e.email,
        password: e.password1,
        role:"customer",
        avatar: "https://picsum.photos/id/237/200/300"
      }
      dispatch(createUserAsync(createNew))
      setOpen(true);
    }//need to check 
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login")
  };

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
            Register Here For Online Shop
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="surname"
              label="Enter Your Surname"
              name="surname"
              value={form.surname}
              onChange={handleChange}
              error={Boolean(errors.surname)}
              helperText={errors.surname}
              autoComplete="surname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
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
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              autoComplete="current-password"
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Your Password"
              type="password"
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
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
              onClick={handleRegisterClick}
            >
              Register 
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Successfully registered...!"
              action={
                <Button color="secondary" size="small" onClick={handleClose}> Close</Button>
              }
            />
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login here"}
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
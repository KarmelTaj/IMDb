import * as React from 'react';
import { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider, styled } from '@mui/material/styles';
import { post } from '../../utils/httpClient'
import { useNavigate } from 'react-router-dom';
import { Collapse, IconButton, Alert, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { login as theme } from '../../utils/theme';

const DarkendBackground = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `url(https://cdn.wallpapersafari.com/19/16/zhUgwH.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  filter: 'brightness(40%)',
  backgroundPosition: '50% 50%',
  zIndex: -1,
}));

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth && userAuth.id) {
      navigate("/");
    }
  }, []);

  const handleSendToSignUp = () => {
    navigate("/sign-up");
  }

  const handleSendToHome = () => {
    navigate("/");
  }

  const handleSend = async () => {
    const response = await post("/login", { username, password });
    if (response.error) {
      setOpenAlert(true);
      setUsername("");
      setPassword("");
    } else {
      localStorage.setItem("userAuth", JSON.stringify(response.user));
      navigate(-1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',  // Vertically center the content
        }}
      >
        <CssBaseline />
        <DarkendBackground />
        <Grid container component="main" sx={{ height: '100%', justifyContent: 'center' }}>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: '12px' }}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon color='primary' />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="current-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSend}
                >
                  Login
                </Button>
                <Grid container >
                  <Grid item display='flex' justifyContent='space-between' sx={{ width: '100%' }} >
                    <Typography onClick={handleSendToSignUp} variant='body2' sx={{ textDecoration: 'underline', color: '#000', cursor: 'pointer' }}>Don't have an account? Sign Up</Typography>
                    <Typography onClick={handleSendToHome} variant='body2' sx={{ color: '#000', cursor: 'pointer' }}>Home</Typography>
                  </Grid>
                </Grid>
                <Collapse in={openAlert}>
                  <Alert action={<IconButton onClick={() => { setOpenAlert(false) }}><CloseIcon></CloseIcon></IconButton>} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Wrong Username and/or Password
                  </Alert>
                </Collapse>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Login;

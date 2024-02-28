import React from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Collapse, IconButton, Alert, AlertTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { post } from '../../utils/httpClient';
import { signUp as theme } from '../../utils/theme';

const DarkendBackground = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `url(https://wallpaperaccess.com/download/one-piece-17377)`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  filter: 'brightness(40%)',
  backgroundPosition: '50% 50%',
  zIndex: -1,
}));


const SignUp = () => {

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

  const handleSubmit = async () => {
    const response = await post("/sign-up", { username, password });
    if (response.error) {
      setOpenAlert(true);
      setUsername("");
      setPassword("");
    } else {
      localStorage.setItem("userAuth", JSON.stringify(response.user));
      navigate(-2);
    }
  };

  const handleSendToLogin = () => {
    navigate("/login");
  }

  const handleSendToHome = () => {
    navigate("/");
  }

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
                Sign Up
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
                <Grid container >
                  <Grid item display='flex' justifyContent='space-between' sx={{ width: '100%' }} >
                    <Typography onClick={handleSendToLogin} variant='body2' sx={{ textDecoration: 'underline', color: '#000', cursor: 'pointer' }}>Already have an account? Log in</Typography>
                    <Typography onClick={handleSendToHome} variant='body2' sx={{ color: '#000', cursor: 'pointer' }}>Home</Typography>
                  </Grid>
                </Grid>
                <Collapse in={openAlert}>
                  <Alert action={<IconButton onClick={() => { setOpenAlert(false) }}><CloseIcon></CloseIcon></IconButton>} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    A User with This Username Already Exists.
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

export default SignUp;
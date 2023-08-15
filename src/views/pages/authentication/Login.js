import React, { useState } from 'react';
import config from '../../../config';
// import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';

// for checks
import { getUserIdFromLS } from '../../../utils/jwtUtils';
import { getUserRoleFromLS } from '../../../utils/jwtUtils';
import { getUserNbrFromLS } from '../../../utils/jwtUtils';

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  // // form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // values returned from payload at login
  // const [userIdKey, setUserIdKey] = useState('');
  // const [userId, setUserId] = useState('');
  // // toast
  // const [toast, addToast] = useState(0);
  // const toaster = useRef();
  const [open, setOpen] = useState(false);

  // Feature detection for 'fetch' API
  const isFetchSupported = 'fetch' in window;

  /**
   * UIA Login
   * @param event
   * @returns {Promise<void>}
   */

  /**
   * Process jwt to safe storage
   * @param jwt
   * @returns {Promise<void>}
   */
  const processJwt = async (jwt) => {
    const payloadObj = JSON.parse(atob(jwt.split('.')[1]));
    await setJWTToLS(jwt, payloadObj.sub, payloadObj.a[0], payloadObj.u);

    // Now log the values after setting them
    console.log('userNbr after setItem: ', getUserNbrFromLS());
    console.log('userRole after setItem: ', getUserRoleFromLS());
    console.log('userId after setItem: ', getUserIdFromLS());
  };

  /**
   * Storage jwt and userId
   * @param jwt - JSON Web Token to be stored
   * @param userId - User ID to be stored
   * @param userRole - User role (e.g., 'admin' - 0 or 'moderator' - 1)
   * @param userNbr - Username
   */
  function setJWTToLS(jwt, userId, userRole, userNbr) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId); // primary key id
    localStorage.setItem('userRole', userRole); // sys:admin, sys:moderator
    localStorage.setItem('userNbr', userNbr); // username
  }

  /**
   * UIA Login
   * @param event
   * @returns {Promise<void>}
   */
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Login form submitted');
    console.log(JSON.stringify({ username: username, password: password }));

    if (!isFetchSupported) {
      console.error('Fetch API is not supported in this browser.');
      // Handle the lack of fetch support, show a message, or use an alternative method for making API requests
      return;
    }

    try {
      const response = await fetch(config.loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      // log response
      console.log('Response:', response);
      if (response.ok) {
        const loginResult = await response.json();
        // login success, retrieve and save jwt
        if (loginResult.accessToken) {
          console.log('User: ' + username + ' log in successful.');
          const jwt = loginResult.accessToken;
          await processJwt(jwt);
          // redirect to home page
          window.location.href = '/';
          // window.location.reload();
        }
        // else, login failed because bad credentials
        else {
          console.error('Failed to log in: ', loginResult.msg);
          resultToast({
            toastColor: config.TOAST_FAILED_COLOR,
            toastMessage: 'failed, cause: ' + loginResult.msg
          });
          setOpen(true);
        }
      } else {
        console.error('Error while logging in. Status: ', response.status);
        resultToast({
          toastColor: config.TOAST_FAILED_COLOR,
          toastMessage: config.TOAST_FAILED_MSG
        });
      }
      setOpen(true);
    } catch (error) {
      console.error('Error while logging in:', error);
      resultToast({
        toastColor: config.TOAST_FAILED_COLOR,
        toastMessage: config.TOAST_FAILED_MSG
      });
      setOpen(true);
    }
  };

  /**
   * Pop toast if login failed
   * @param toastColor
   * @param toastHeader
   * @param toastMessage
   * @returns {JSX.Element}
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const resultToast = ({ toastColor, toastMessage }) => (
    <Snackbar open={open} autoHideDuration={6000} color={toastColor} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Your login attempt is {toastMessage}
      </Alert>
    </Snackbar>
  );

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Hi, Welcome Back
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/*Form Logic goes here*/}
                    <form noValidate>
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        type="text"
                        value={username ? username : ''}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ margin: '10px 0' }}
                      />
                      <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password ? password : ''}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ margin: '10px 0' }}
                      />
                      <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ margin: '10px 0' }}>
                        Sign In
                      </Button>
                    </form>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;

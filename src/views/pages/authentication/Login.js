// import React, { useRef, useState } from 'react';
// import config from '../../../config';
// import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from './auth-forms/AuthLogin';
// import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  // // form values
  // const [username, setUsername] = useState(null);
  // const [password, setPassword] = useState(null);
  // // toast
  // const [toast, addToast] = useState(0);
  // const toaster = useRef();
  // const [open, setOpen] = useState(false);
  //
  // /**
  //  * Process jwt to safe storage
  //  * @param jwt
  //  * @returns {Promise<void>}
  //  */
  // const processJwt = async (jwt) => {
  //   const payloadObj = JSON.parse(atob(jwt.split('.')[1]));
  //   await setJWTToLS(jwt, payloadObj.sub, payloadObj.a[0], payloadObj.u);
  // };
  //
  // /**
  //  * Storage jwt and userId
  //  * @param jwt
  //  */
  // function setJWTToLS(jwt, userId, userRole, userNbr) {
  //   localStorage.setItem('jwt', jwt);
  //   let userIdKey = '';
  //   switch (userRole) {
  //     case config.USER_ROLE_ADMIN:
  //       userIdKey = 'adminId';
  //       break;
  //     case config.USER_ROLE_MODERATOR:
  //       userIdKey = 'studentId';
  //       break;
  //   }
  //   localStorage.setItem('isLoggedIn', 'true');
  //   localStorage.setItem(userIdKey, userId);
  //   localStorage.setItem('userRole', userRole);
  //   localStorage.setItem('userNbr', userNbr);
  // }
  //
  // /**
  //  * UIA Login
  //  * @param event
  //  * @returns {Promise<void>}
  //  */
  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   console.log(JSON.stringify({ username: username, password: password }));
  //   try {
  //     const response = await fetch(config.loginUrl, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ username: username, password: password })
  //     });
  //     if (response.ok) {
  //       const loginResult = await response.json();
  //       // login success, retrieve and save jwt
  //       if (loginResult.code === config.REQUEST_SUCCESS) {
  //         console.log('User: ' + username + ' log in successful.');
  //         const jwt = loginResult.data.accessToken;
  //         await processJwt(jwt);
  //         // redirect to home page
  //         window.location.href = '/home';
  //         window.location.reload();
  //       }
  //       // else, login failed because bad credentials
  //       else {
  //         console.error('Failed to log in: ', loginResult.msg);
  //         addToast(
  //           resultToast({
  //             toastColor: config.TOAST_FAILED_COLOR,
  //             toastMessage: 'failed, cause: ' + loginResult.msg
  //           })
  //         );
  //       }
  //     } else {
  //       console.error('Error while logging in.');
  //       addToast(
  //         resultToast({
  //           toastColor: config.TOAST_FAILED_COLOR,
  //           toastMessage: config.TOAST_FAILED_MSG
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.error('Error while logging in:', error);
  //     addToast(
  //       resultToast({
  //         toastColor: config.TOAST_FAILED_COLOR,
  //         toastMessage: config.TOAST_FAILED_MSG
  //       })
  //     );
  //   }
  // };
  //
  // /**
  //  * Pop toast if login failed
  //  * @param toastColor
  //  * @param toastHeader
  //  * @param toastMessage
  //  * @returns {JSX.Element}
  //  */
  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  //
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };
  // const resultToast = ({ toastColor, toastMessage }) => (
  //   <Snackbar
  //       autoHideDuration={6000}
  //       color={toastColor}
  //       onClose={handleClose}>
  //     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
  //       Your login attempt is {toastMessage}
  //     </Alert>
  //   </Snackbar>
  // );

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  {/*<Grid item sx={{ mb: 3 }}>*/}
                  {/*  <Link to="#">*/}
                  {/*    <Logo />*/}
                  {/*  </Link>*/}
                  {/*</Grid>*/}
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
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/*<Grid item xs={12}>*/}
                  {/*  <Grid item container direction="column" alignItems="center" xs={12}>*/}
                  {/*    <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>*/}
                  {/*      Don&apos;t have an account?*/}
                  {/*    </Typography>*/}
                  {/*  </Grid>*/}
                  {/*</Grid>*/}
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item xs={12} sx={{ m: 3, mt: 1 }}>*/}
        {/*  <AuthFooter />*/}
        {/*</Grid>*/}
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;

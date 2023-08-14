import React from 'react';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { Grid, Typography } from '@mui/material';

const Logout = () => {
  // const navigate = useNavigate();

  useEffect(() => {
    try {
      if (localStorage.getItem('isLoggedIn') !== null) {
        // Clear local storage items on component mount
        Promise.all([
          new Promise((resolve) => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('isLoggedIn');
            resolve();
          }),
          new Promise((resolve) => {
            localStorage.removeItem('adminId');
            localStorage.removeItem('moderatorId');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userNbr');
            resolve();
          }),
        ]).then(() => {
          // Refresh the page to clear any cached data
          window.location.reload();
          // Redirect to the login page by reloading the page
          window.location.href = '/login';
        });
      }
    } catch (error) {
      console.error('Error during logout navigation: ', error);
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('isLoggedIn') !== null) {
  //     // Clear local storage items on component mount
  //     localStorage.removeItem('jwt');
  //     localStorage.removeItem('isLoggedIn');
  //     localStorage.removeItem('adminId');
  //     localStorage.removeItem('moderatorId');
  //     localStorage.removeItem('userRole');
  //     localStorage.removeItem('userNbr');
  //
  //     // Redirect to the login page
  //     navigate('/login');
  //   }
  // }, [navigate]);

  return (
    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
      <Typography variant="body2">You have successfully logged out. Until next time, bye!</Typography>
    </Grid>
  );
};

export default Logout;

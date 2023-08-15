import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { Box, Button, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import config from '../../config';
import { getUserIdFromLS } from '../../utils/jwtUtils';
import { getJWTFromLS } from '../../utils/jwtUtils';

// ==============================|| UPDATE PROFILE for Administrators and Moderators ||============================== //

// to consistently edit all padding values
const ELEMENT_PADDING = '16px';

// if time permits, add warning alert to handleClose function "Exit without saving?"

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [confirmPassword, setConfirmPassword] = useState('');
  const formRef = useRef(null);
  const userId = getUserIdFromLS();
  const navigate = useNavigate();

  const handleSave = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(getJWTFromLS());
    // Validation: Check if passwords match
    const passwordTrim = formDataObject['password'].trim();
    const confirmPasswordTrim = formDataObject['confirmPassword'].trim();
    if (passwordTrim !== confirmPasswordTrim) {
      console.error('Passwords do not match');
      return; // Prevent form submission
    }
    console.log('password transferred to handleSave: ', password);
    const userIdInt = parseInt(userId, 10);
    // Construct the JSON payload
    const data = {
      id: userIdInt,
      password: passwordTrim
    };

    // Make the PUT request to the backend
    try {
      console.log('to PUT - Submitting form data:', data); // Log the data before making the PUT request
      const response = await fetch(config.password, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Process the response data if needed
      const responseData = await response.json();
      console.log('Record updated:', responseData);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  }, []);

  const handleClose = () => {
    try {
      navigate('/');
    } catch (error) {
      console.error('Navigation failed:', error);
      // Use window.location.href as a backup option
      window.location.href = '/';
    }
  };

  return (
    <MainCard title="Change Password">
      <Typography variant="body2">
        <form ref={formRef}>
          <Box style={{ maxWidth: 300, margin: '0 auto' }}>
            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: ELEMENT_PADDING }} // Add spacing between TextField components
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              variant="outlined"
              fullWidth
              style={{ marginBottom: ELEMENT_PADDING }} // Add spacing between TextField components
            />
            <Button variant="contained" style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={handleClose} variant="contained" style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Typography>
    </MainCard>
  );
};

export default ChangePassword;

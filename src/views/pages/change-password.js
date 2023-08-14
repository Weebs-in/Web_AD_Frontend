import React, { useCallback, useState } from 'react';
import {useNavigate} from "react-router";

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

const attributes = [
  { header: 'Password', field: 'password' },
  { header: 'Confirm Password', field: null }
];

// if time permits, add warning alert to handleClose function "Exit without saving?"

const ChangePassword = () => {
  // Initialize formData state with an empty object
  const [formData, setFormData] = useState({});
  const userId = getUserIdFromLS();
  const navigate = useNavigate();

  // Handle input change and update formData state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSave = useCallback(async (event) => {
    event.preventDefault();

    // Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return; // Prevent form submission
    }

    console.log('to PUT - Form data before conversion to JSON:', formData);
    // Construct the JSON payload
    const data = {
      id: userId, // Assuming the user ID is available from getUserIdFromLS()
      password: formData.password
    };
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = typeof value === 'string' ? value.trim() : value;
    });

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
        <form onSubmit={handleSave}>
          <Box style={{ maxWidth: 300, margin: '0 auto' }}>
            {attributes.map((attribute) => (
              <TextField
                key={attribute.field}
                name={attribute.field}
                label={attribute.header}
                type="password"
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                style={{ marginBottom: ELEMENT_PADDING }} // Add spacing between TextField components
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}
              // onClick={(event) => handleSave(event, formData)}
            >
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

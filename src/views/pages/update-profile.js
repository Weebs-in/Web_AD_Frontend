import React, { useCallback, useEffect, useState } from 'react';

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

// add code to perform GET request to retrieve field values for logged in staff based on ID

const attributes = [
  { header: 'Username', field: 'username' },
  { header: 'Phone No.', field: 'phoneNumber' },
  { header: 'Email', field: 'email' }
];

// add handleSave function

// add handleClose function

// if time permits, add warning alert to handleClose function "Exit without saving?"

const UpdateProfile = () => {
  // Initialize formData state with an empty object
  const [formData, setFormData] = useState({});
  const userId = getUserIdFromLS();
  // const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    console.log('fetchUserData triggered');
    try {
      const response = await fetch(config.staff + '/' + userId, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Retrieved staff data successfully');
        console.log(data);
        setFormData(data);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Handle input change and update formData state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSave = useCallback(async (event, formData) => {
    console.log('to PUT - Form data before conversion to JSON:', formData);
    // Convert the form data to a JSON object
    const staffId = formData.id;
    const data = {};
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = typeof value === 'string' ? value.trim() : value;
    });

    // Make the PUT request to the backend
    try {
      console.log('to PUT - Submitting form data:', data); // Log the data before making the PUT request
      const response = await fetch(config.staff + '/' + staffId, {
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

      // Fetch the updated collection points data
      await fetchUserData();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  }, []);

  return (
    <MainCard title="Update Profile and Settings">
      <Typography variant="body2">
        <form>
          <Box style={{ maxWidth: 300, margin: '0 auto' }}>
            {attributes.map((attribute) => (
              <TextField
                key={attribute.field}
                name={attribute.field}
                label={attribute.header}
                value={formData[attribute.field] || ''}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                style={{ marginBottom: ELEMENT_PADDING }} // Add spacing between TextField components
              />
            ))}
            <Button
              variant="contained"
              style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}
              onClick={(event) => handleSave(event, formData)}
            >
              Save
            </Button>
            <Button variant="contained" style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
              Close
            </Button>
          </Box>
        </form>
      </Typography>
    </MainCard>
  );
};

export default UpdateProfile;

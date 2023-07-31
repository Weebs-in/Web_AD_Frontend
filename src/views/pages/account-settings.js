import React, { useState } from 'react';

// material-ui
import { Button, Grid, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| ACCOUNT SETTINGS for Administrators and Moderators ||============================== //

// to consistently edit all padding values
const ELEMENT_PADDING = '16px';

// add code to perform GET request to retrieve field values for logged in staff based on ID

const attributes = [
  { header: 'Username', field: 'username' },
  { header: 'Phone No.', field: 'phoneNumber' },
  { header: 'Email', field: 'email' },
  { header: 'Password', field: 'password' },
  { header: 'Role', field: 'role' }
];

// add handleSave function

// add handleClose function

// if time permits, add warning alert to handleClose function "Exit without saving?"

const AccountSettings = () => {
  // Initialize formData state with an empty object
  const [formData, setFormData] = useState({});

  // Handle input change and update formData state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <MainCard title="Update Profile and Settings">
      <Typography variant="body2">
        <form>
          <Grid container spacing={2}>
            {attributes.map((attribute) => (
              <Grid item xs={6} key={attribute.field}>
                <TextField
                  name={attribute.field}
                  label={attribute.header}
                  value={formData[attribute.field] || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          {/* add onClick={handleSave} once function implemented */}
          <Button variant="contained" style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
            Save
          </Button>
          {/* add onClick={onClose} once function implemented */}
          <Button variant="contained" style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
            Close
          </Button>
        </form>
      </Typography>
    </MainCard>
  );
};

export default AccountSettings;

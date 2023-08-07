// modal to be specifically used by BookListing
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Modal, Button, Typography, TextField, Grid } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 0,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

// to consistently edit all padding values
const ELEMENT_PADDING = '16px';

const ListingEditModal = ({ isOpen, onClose, bookData }) => {
  const [editedData, setEditedData] = useState(data);

  if (!data) {
    return null; // to handle case when data is null
  }

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    handleUpdateSubmit(bookData.id, editedData); // Call the handleUpdateSubmit function with the book ID and edited data
    onClose(); // Close the modal after saving changes
  };

  const handleUpdateSubmit = async (id, formData) => {
    console.log('to PUT - Form data before conversion to JSON:', formData);
    // Convert the form data to a JSON object
    const data = {};
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = typeof value === 'string' ? value.trim() : value;
    });

    // Make the PUT request to the backend
    try {
      console.log('to PUT - Submitting form data:', data); // Log the data before making the PUT request
      const response = await fetch(config.book + '/' + id, {
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

      // Fetch the updated book listing data
      await fetchBookListings();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  // define columns for modal
  const columns = [
    {
      field: 'donor',
      headerName: 'Donor',
      type: 'string',
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => params.row.donor.username
    },
    { field: 'title', header: 'Book Title', type: 'string' },
    { field: 'author', header: 'Author Name', type: 'string' },
    { field: 'isbn', header: 'ISBN', type: 'number' },
    { field: 'genre', header: 'Genre', type: 'string' },
    { field: 'press', header: 'Press', type: 'string' },
    {
      field: 'language',
      headerName: 'Language',
      type: 'singleSelect',
      valueOptions: [
        { value: 0, label: 'English' },
        { value: 1, label: 'Chinese' },
        { value: 2, label: 'Malay' },
        { value: 3, label: 'Tamil' },
        { value: 4, label: 'Japanese' },
        { value: 5, label: 'French' },
        { value: 6, label: 'German' }
      ]
    },
    {
      field: 'bookCondition',
      headerName: 'Book Condition',
      type: 'singleSelect',
      valueOptions: [
        { value: 0, label: 'Brand New' },
        { value: 1, label: 'Like New' },
        { value: 2, label: 'Lightly Used' },
        { value: 3, label: 'Well Used' }
      ]
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'singleSelect',
      valueOptions: [
        { value: 0, label: 'Available' },
        { value: 1, label: 'Reserved' }, // transaction in progress
        { value: 2, label: 'Unavailable' }, // completed donation transaction
        { value: 3, label: 'Removed' } // veto-ed by moderator
      ]
    },
    {
      field: 'likeCount',
      headerName: 'Likes',
      type: 'number'
    },
    { field: 'cover', header: 'Cover', type: 'string' },
    {
      field: 'description',
      headerName: 'Likes',
      type: 'string',
      multiline: true,
      rows: 3
    }
  ];

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Update Fields
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form>
            <Grid container spacing={2}>
              {columns.map((col) => (
                <Grid item xs={12} sm={6} key={col.field}>
                  <TextField
                    name={col.field}
                    label={col.header}
                    value={editedData[col.field]}
                    onChange={(e) => handleFieldChange(col.field, e.target.value)}
                    variant="outlined"
                    fullWidth
                    // If it's a singleSelect type, render a dropdown
                    // Otherwise, render a regular TextField
                    {...(col.type === 'singleSelect' ? { select: true } : {})}
                    // If the field is non-editable, disable it
                    {...(col.editable === false ? { disabled: true } : {})}
                    // If the field is multiline, set the multiline and rows props
                    {...(col.multiline ? { multiline: true, rows: col.rows || 3 } : {})}
                    // Add other custom props as needed for specific attributes
                    // For example, you can add the 'type' prop, 'select' prop for dropdowns, etc.
                  >
                    {/* Render dropdown options if it's a singleSelect type */}
                    {col.type === 'singleSelect' &&
                      col.valueOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </TextField>
                </Grid>
              ))}
            </Grid>
          </form>
          <Button variant="contained" onClick={handleSave} style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
            Save
          </Button>
          <Button variant="contained" onClick={onClose} style={{ marginRight: ELEMENT_PADDING, marginTop: ELEMENT_PADDING }}>
            Cancel
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

ListingEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookData: PropTypes.object.isRequired
};

export default ListingEditModal;

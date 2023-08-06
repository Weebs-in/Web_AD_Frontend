// modal to be used by TableEditModal
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

const EditModal = ({ data, isOpen, onClose, onSave, columns }) => {
  const [editedData, setEditedData] = useState(data);

  if (!data) {
    return null; // to handle case when data is null
  }

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    onSave(editedData); // Call the onSave function (passed as a prop) with the edited data
    onClose(); // Close the modal after saving changes
  };

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
                  />
                </Grid>
              ))}
            </Grid>
            {/*<Grid container spacing={2}>*/}
            {/*  {Object.keys(data).map((key) => (*/}
            {/*    <Grid item xs={12} sm={6} key={key}>*/}
            {/*      /!* Use the labelField prop to dynamically generate labels *!/*/}
            {/*      /!* Use label if we want it bigger *!/*/}
            {/*      /!* <label>{columns.find((col) => col.field === key)?.header}</label> *!/*/}
            {/*      <TextField*/}
            {/*        name={key}*/}
            {/*        label={columns.find((col) => col.field === key)?.header}*/}
            {/*        value={editedData[key]}*/}
            {/*        onChange={handleInputChange}*/}
            {/*        variant="outlined"*/}
            {/*        fullWidth // To make the TextField take the full width of the form*/}
            {/*      />*/}
            {/*    </Grid>*/}
            {/*/!*  ))}*!/*/}
            {/*</Grid>*/}
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

EditModal.propTypes = {
  data: PropTypes.object.isRequired, // Single object representing the current row
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired
    })
  ).isRequired
};

export default EditModal;

// modal to be used by TableEditModal
import React, { useEffect, useState } from 'react';
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

const EditModal = ({ data, isOpen, onClose, onSaveChanges, columns }) => {
  const [editedData, setEditedData] = useState(data);

  // Add useEffect to log the value of labelField when the modal is opened (debugging)
  useEffect(() => {
    console.log('EditModal labelField:', columns);
  }, [columns]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSaveChanges(editedData);
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
                    onChange={handleInputChange}
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
            Close
          </Button>
        </Typography>
      </Box>
    </Modal>
  );
};

EditModal.propTypes = {
  data: PropTypes.object.isRequired, // Single object representing the current row
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  columns: PropTypes.string.isRequired // prop for specifying the field in data that contains the labels
};

export default EditModal;

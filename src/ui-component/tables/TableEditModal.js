// For CRUD functions with an edit button
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button, Modal } from '@mui/material';
import EditModal from './EditModal';

const TableEditModal = ({ data, columns, labelField }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [deletingData, setDeletingData] = useState(null);

  // Pagination state variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the starting and ending index based on pagination settings
  const startIndex = page * rowsPerPage;

  // handle clicking for modals
  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setModalOpen(true);
  };

  const handleDeleteClick = (rowData) => {
    // Set the data of the row to be deleted in the deletingData state
    setDeletingData(rowData);
    // setModalOpen(true); // Open the modal (if you want to show a confirmation dialog)
  };

  const handleModalClose = () => {
    setEditingData(null);
    // setDeletingData(null); // Clear the deletingData state when the modal is closed
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Access the form data or any relevant state needed for saving changes
    // For example, if you have form inputs in the modal, you can access them here
    // const formData = { ... };

    // Perform any processing or save the data as needed
    // For example, you might make an API call to update the data in the database

    // Check if there is data to be deleted
    if (deletingData) {
      // Perform the actual deletion logic here
      // For example, you might make an API call to delete the data from the database
      // Your specific implementation will depend on your backend and data storage
      // After the deletion is done, you can refresh the data or update the table as needed
      // For example, if your data comes from an API, you can fetch the updated data again
      // const updatedData = fetchDataFromAPI();
      // setData(updatedData);
      console.log('testing delete button');
    }

    // After saving changes, you can close the modal if desired
    setModalOpen(false);
  };
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return <div>No columns available.</div>;
  }

  // Add an "Edit" button column to the columns prop
  const updatedColumns = [
    ...columns,
    {
      header: 'Update',
      field: 'edit',
      render: (rowData) => (
        <Button variant="outlined" onClick={() => handleEditClick(rowData)}>
          Edit
        </Button>
      )
    },
    {
      header: 'Delete',
      field: 'delete',
      render: (rowData) => (
        <Button variant="outlined" color="error" onClick={() => handleDeleteClick(rowData)}>
          Delete
        </Button>
      )
    }
  ];
  console.log('TableEditModal labelField:', labelField); // to remove after debugging
  console.log('updatedColumns:', updatedColumns); // Add this line to log the updatedColumns

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="basic table">
          <TableHead>
            <TableRow>
              {updatedColumns.map((column) => (
                <TableCell key={column.field}>
                  {/* Use the labelField prop to dynamically retrieve the labels */}
                  {column[labelField]} {/* This will display the header label */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Use slice() to display only the relevant rows based on pagination */}
            {data.slice(startIndex, startIndex + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                {updatedColumns.map((column) => (
                  <TableCell key={column.field}>{column.render ? column.render(row) : row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Table Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for editing */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div>
          {/* Pass necessary data and props to the EditModal */}
          <EditModal
            data={editingData}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSaveChanges={handleSaveChanges}
            columns={columns}
          />
        </div>
      </Modal>
    </div>
  );
};

TableEditModal.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      render: PropTypes.func // Optional render function for custom rendering
    })
  ).isRequired,
  labelField: PropTypes.string.isRequired // for specifying the field in data that contains the labels
};

export default TableEditModal;

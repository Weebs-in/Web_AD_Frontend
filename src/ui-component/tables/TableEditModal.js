// For CRUD functions with an edit button
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Button, Modal } from '@mui/material';

const TableEditModal = ({ data, columns }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

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

  const handleModalClose = () => {
    setEditingData(null);
    setModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Access the form data or any relevant state needed for saving changes
    // For example, if you have form inputs in the modal, you can access them here
    // const formData = { ... };

    // Perform any processing or save the data as needed
    // For example, you might make an API call to update the data in the database

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
      header: 'Edit',
      field: 'edit',
      render: (rowData) => (
        <Button variant="outlined" onClick={() => handleEditClick(rowData)}>
          Edit
        </Button>
      )
    }
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="basic table">
          <TableHead>
            <TableRow>
              {updatedColumns.map((column) => (
                <TableCell key={column.field}>{column.header}</TableCell>
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
          {/* Your modal content for editing */}
          <h2>Edit Data</h2>
          <p>{editingData && JSON.stringify(editingData)}</p>
          <Button variant="contained" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSaveChanges}>
            Save Changes
          </Button>
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
  ).isRequired
};

export default TableEditModal;

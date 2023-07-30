// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TableEditModal from '../../ui-component/tables/TableEditModal';

// ==============================|| CRUD for Administrators and Moderators ||============================== //

// Sample data and columns
const data = [
  { id: 1, name: 'Adam', role: 'Administrator' },
  { id: 2, name: 'Eve', role: 'Administrator' },
  { id: 3, name: 'Alice', role: 'Moderator' },
  { id: 4, name: 'Bob', role: 'Moderator' }
  // Add more data as needed
];

const columns = [
  { header: 'ID', field: 'id', render: (rowData) => rowData.id },
  { header: 'Name', field: 'name', render: (rowData) => rowData.name },
  { header: 'Role', field: 'role', render: (rowData) => rowData.role }
];

const labelField = 'header';

const ManageStaff = () => (
  // // function for deleting row
  // const handleDelete = async (id) => {
  //   event.preventDefault();
  //   try {
  //     const params = new URLSearchParams();
  //     params.append('id', id);
  //     const response = await fetch(config.deleteLecturer + `?${params.toString()}`, {
  //       headers: {
  //         'Authorization': 'Bearer ' + getJWTFromLS(),
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'DELETE'
  //     });
  //     if (response.ok) {
  //       const responseData = await response.json();
  //       if (responseData.code === config.REQUEST_SUCCESS) {
  //         console.log('Lecturer deleted');
  //         setVisibleDel(false);
  //         addToast(resultToast({
  //           toastColor: config.TOAST_SUCCESS_COLOR,
  //           toastMessage: config.TOAST_SUCCESS_MSG
  //         }));
  //         await fetchLecturers();
  //       } else {
  //         console.error('Failed to delete faculty: ', responseData.msg);
  //         addToast(resultToast({
  //           toastColor: config.TOAST_FAILED_COLOR,
  //           toastMessage: config.TOAST_FAILED_MSG
  //         }));
  //       }
  //     } else {
  //       console.error('Failed to submit form data, request failed');
  //       addToast(resultToast({
  //         toastColor: config.TOAST_FAILED_COLOR,
  //         toastMessage: config.TOAST_FAILED_MSG
  //       }));
  //     }
  //   } catch (error) {
  //     console.error('Error while submitting form data:', error);
  //     addToast(resultToast({
  //       toastColor: config.TOAST_FAILED_COLOR,
  //       toastMessage: config.TOAST_FAILED_MSG
  //     }));
  //   }
  // };
  //
  // // function to handle delete action when triggered by Table
  // const handleDeleteFromTableModal = async (rowData) => {
  //   // Extract the lecturerId from rowData or any other relevant data
  //   const id = rowData.id; // Replace "id" with the actual key in your rowData
  //
  //   // Call the handleDelete function with the lecturerId
  //   await handleDelete(id);
  // };

  <MainCard title="Adminstrators and Moderators">
    <Typography variant="body2">
      <h3>Create, Read, Update, Delete</h3>
      <TableEditModal
        data={data}
        columns={columns}
        labelField={labelField}
        // onDelete={handleDeleteFromTableModal}
      />
    </Typography>
  </MainCard>
);

export default ManageStaff;

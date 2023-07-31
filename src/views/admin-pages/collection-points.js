// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TableEditModal from '../../ui-component/tables/TableEditModal';
import SearchBar from '../../ui-component/SearchBar';

// ==============================|| COLLECTION POINTS MANAGEMENT ||============================== //

const testData = [
  { id: 1, name: 'ISS', address: 'userA@example.com', status: 'Available', qrCode: 'nil' },
  { id: 2, name: 'Bisstro', address: 'userB@example.com', status: 'Unavailable', qrCode: 'nil' },
  { id: 3, name: 'Male Toilet', address: 'level 2', status: 'Available', qrCode: 'nil' },
  { id: 4, name: 'Female Toilet', address: 'level 3', status: 'Available', qrCode: 'nil' },
  { id: 5, name: 'Ceiling', address: 'userA@example.com', status: 'Available', qrCode: 'nil' },
  { id: 6, name: 'Canteen', address: 'userB@example.com', status: 'Unavailable', qrCode: 'nil' },
  { id: 7, name: 'NUS', address: 'userA@example.com', status: 'Available', qrCode: 'nil' },
  { id: 8, name: 'NTU', address: 'userB@example.com', status: 'Available', qrCode: 'nil' },
  { id: 9, name: 'SMU', address: 'userA@example.com', status: 'Unavailable', qrCode: 'nil' },
  { id: 10, name: 'SIM', address: 'userB@example.com', status: 'Available', qrCode: 'nil' },
  { id: 11, name: 'SUSS', address: 'userA@example.com', status: 'Unavailable', qrCode: 'nil' },
  { id: 12, name: 'SUTD', address: 'userB@example.com', status: 'Available', qrCode: 'nil' },
  { id: 13, name: 'Grass patch', address: 'userA@example.com', status: 'Available', qrCode: 'nil' },
  { id: 14, name: 'Sky', address: 'userB@example.com', status: 'Available', qrCode: 'nil' },
  { id: 15, name: 'Library', address: 'userA@example.com', status: 'Available', qrCode: 'nil' },
  { id: 16, name: 'Swimming pool', address: 'userB@example.com', status: 'Available', qrCode: 'nil' }
  // Add more user data as needed
];

const labelField = 'header';

const testColumns = [
  // { header: 'ID', field: 'id' },
  { header: 'Name', field: 'name', render: (rowData) => rowData.name },
  { header: 'Address', field: 'address', render: (rowData) => rowData.address },
  { header: 'Status', field: 'status', render: (rowData) => rowData.status },
  { header: 'QR Code', field: 'qrCode', render: (rowData) => rowData.qrCode }
];

const CollectionPoints = () => (
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
  <MainCard title="Collection Points">
    <Typography variant="body2">
      <SearchBar />
      <TableEditModal data={testData} columns={testColumns} labelField={labelField} />
    </Typography>
  </MainCard>
);

export default CollectionPoints;

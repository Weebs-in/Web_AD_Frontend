// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BasicTable from '../../ui-component/tables/BasicTable';

// ==============================|| CRUD for Administrators and Moderators ||============================== //

// Sample data and columns
const data = [
  { id: 1, username: 'Adam', phone: '333222', email: 'adam@adproject.com', role: '0' },
  { id: 2, username: 'Eve', phone: '111222', email: 'eve@adproject.com', role: '0' },
  { id: 3, username: 'Alice', phone: '333222', email: 'alice@adproject.com', role: '1' },
  { id: 4, username: 'Bob', phone: '111222', email: 'bob@adproject.com', role: '1' },
  { id: 5, username: 'Charlie', phone: '333222', email: 'charlie@adproject.com', role: '1' },
  { id: 6, username: 'Mcdonalds', phone: '111222', email: 'macs@adproject.com', role: '1' },
  { id: 7, username: 'KFC', phone: '333222', email: 'kfc@adproject.com', role: '1' },
  { id: 8, username: 'BurgerKing', phone: '111222', email: 'burgerking@adproject.com', role: '1' }
  // Add more data as needed
];

const columns = [
  // { header: 'ID', field: 'id'},
  { header: 'Username', field: 'username' },
  { header: 'Phone', field: 'phone' },
  { header: 'Email', field: 'email' },
  { header: 'Role', field: 'role' }
];

const labelField = 'header';

const ManageStaff = () => {
  // Map the data and update the "Role" field
  const updatedData = data.map((item) => ({
    ...item,
    role:
        item.role === '0'
            ? 'Administrator'
            : item.role === '1'
                ? 'Moderator'
                : null // Return null if role is neither '0' nor '1'
  }));
  return (
    <MainCard title="Adminstrators and Moderators">
      <Typography variant="body2">
        <h3>Staff Information</h3>
        <BasicTable
          data={updatedData}
          columns={columns}
          labelField={labelField}
          // onDelete={handleDeleteFromTableModal}
        />
      </Typography>
    </MainCard>
  );
};

export default ManageStaff;

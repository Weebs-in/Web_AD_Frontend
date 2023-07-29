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

const ManageStaff = () => (
  <MainCard title="Adminstrators and Moderators">
    <Typography variant="body2">
      <h3>Create, Read, Update, Delete</h3>
      <TableEditModal data={data} columns={columns} />
    </Typography>
  </MainCard>
);

export default ManageStaff;

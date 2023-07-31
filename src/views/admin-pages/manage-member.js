// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TableEditModal from '../../ui-component/tables/TableEditModal';
import SearchBar from '../../ui-component/SearchBar';

// ==============================|| MEMBERS PAGE ||============================== //
const testData = [
  {
    id: 1,
    userName: 'ISS',
    displayName: 'Institute of Systems Science',
    phoneNumber: '999',
    email: 'iss@adproject.com',
    birthday: '1 Jan 0000',
    gender: 'M',
    bio: 'No idea',
    avatar: 'avatarURL'
  }
  // Add more test data as needed
];

const labelField = 'header';

const testColumns = [
  // { header: 'ID', field: 'id' },
  { header: 'Username', field: 'userName', render: (rowData) => rowData.userName },
  { header: 'Name', field: 'displayName', render: (rowData) => rowData.displayName },
  { header: 'Phone Number', field: 'phoneNumber', render: (rowData) => rowData.phoneNumber },
  { header: 'Email', field: 'email', render: (rowData) => rowData.email },
  // { header: 'Password', field: 'password', render: (rowData) => rowData.password },
  { header: 'Birthday', field: 'birthday', render: (rowData) => rowData.birthday },
  { header: 'Gender', field: 'gender', render: (rowData) => rowData.gender },
  { header: 'Bio', field: 'bio', render: (rowData) => rowData.bio }
  // { header: 'Avatar', field: 'avatar', render: (rowData) => rowData.avatar }
];
const ManageMember = () => (
  <MainCard title="Members">
    <Typography variant="body2">
      <SearchBar />
      <TableEditModal data={testData} columns={testColumns} labelField={labelField} />
    </Typography>
  </MainCard>
);

export default ManageMember;

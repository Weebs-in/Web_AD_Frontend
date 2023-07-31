// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TableEditModal from '../../ui-component/tables/TableEditModal';
import SearchBar from '../../ui-component/SearchBar';

// ==============================|| BOOK LISTINGS PAGE ||============================== //

const testData = [
  {
    id: 1,
    donorID: 'ISS',
    status: 'Active',
    title: 'FOPCS',
    author: 'Liu Fan',
    genre: 'Non-fiction',
    language: 'C#',
    description: 'No idea',
    isbn: '00000',
    press: 'iss'
  },
  {
    id: 2,
    donorID: 'ISS',
    status: 'Active',
    title: 'Machine Learning',
    author: 'Cher Wah and Yuen Kwan',
    genre: 'Mystery',
    language: 'C#',
    description: 'No idea',
    isbn: '00000',
    press: 'iss'
  },
  {
    id: 3,
    donorID: 'ISS',
    status: 'Active',
    title: 'Java and Spring',
    author: 'Tin and Darryl',
    genre: 'Horror',
    language: 'Java',
    description: 'No idea',
    isbn: '00000',
    press: 'iss'
  }
  // Add more test data as needed
];

const labelField = 'header';

const testColumns = [
  // { header: 'ID', field: 'id' },
  { header: 'Donor ID', field: 'donorID', render: (rowData) => rowData.donorID },
  { header: 'Status', field: 'status', render: (rowData) => rowData.status },
  { header: 'Title', field: 'title', render: (rowData) => rowData.title },
  { header: 'Author', field: 'address', render: (rowData) => rowData.author },
  { header: 'Genre', field: 'genre', render: (rowData) => rowData.genre },
  { header: 'Language', field: 'language', render: (rowData) => rowData.language },
  { header: 'Description', field: 'description', render: (rowData) => rowData.description },
  { header: 'ISBN', field: 'isbn', render: (rowData) => rowData.isbn },
  { header: 'Press', field: 'press', render: (rowData) => rowData.description }
];

const ManageBookListings = () => (
  <MainCard title="Book Listings">
    <Typography variant="body2">
      <SearchBar />
      <TableEditModal data={testData} columns={testColumns} labelField={labelField} />
    </Typography>
  </MainCard>
);

export default ManageBookListings;

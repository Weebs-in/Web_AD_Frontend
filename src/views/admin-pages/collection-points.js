// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BasicTable from '../../ui-component/tables/BasicTable';

// ==============================|| COLLECTION POINTS MANAGEMENT ||============================== //

const testData = [
  { id: 1, name: 'Place A', add: 'userA@example.com' },
  { id: 2, name: 'Place B', add: 'userB@example.com' },
  { id: 3, name: 'Place A', add: 'userA@example.com' },
  { id: 4, name: 'Place B', add: 'userB@example.com' },
  { id: 5, name: 'Place A', add: 'userA@example.com' },
  { id: 6, name: 'Place B', add: 'userB@example.com' },
  { id: 7, name: 'Place A', add: 'userA@example.com' },
  { id: 8, name: 'Place B', add: 'userB@example.com' },
  { id: 9, name: 'Place A', add: 'userA@example.com' },
  { id: 10, name: 'Place B', add: 'userB@example.com' },
  { id: 11, name: 'Place A', add: 'userA@example.com' },
  { id: 12, name: 'Place B', add: 'userB@example.com' },
  { id: 13, name: 'Place A', add: 'userA@example.com' },
  { id: 14, name: 'Place B', add: 'userB@example.com' },
  { id: 15, name: 'Place A', add: 'userA@example.com' },
  { id: 16, name: 'Place B', add: 'userB@example.com' }
  // Add more user data as needed
];

const testColumns = [
  { header: 'ID', field: 'id' },
  { header: 'Name', field: 'name' },
  { header: 'Address', field: 'add' }
];

const CollectionPoints = () => (
  <MainCard title="Collection Points">
    <Typography variant="body2">
      Testing Basic Table
      <BasicTable data={testData} columns={testColumns} />
    </Typography>
  </MainCard>
);

export default CollectionPoints;

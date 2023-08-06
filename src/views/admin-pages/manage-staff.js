import React, { useEffect, useState } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import BasicTable from '../../ui-component/tables/BasicTable';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

// ==============================|| CRUD for Administrators and Moderators ||============================== //

// Sample data and columns
// const data = [
//   { id: 1, username: 'Adam', phoneNumber: '333222', email: 'adam@adproject.com', role: '0' },
//   { id: 2, username: 'Eve', phoneNumber: '111222', email: 'eve@adproject.com', role: '0' },
//   { id: 3, username: 'Alice', phoneNumber: '333222', email: 'alice@adproject.com', role: '1' },
//   { id: 4, username: 'Bob', phoneNumber: '111222', email: 'bob@adproject.com', role: '1' },
//   { id: 5, username: 'Charlie', phoneNumber: '333222', email: 'charlie@adproject.com', role: '1' },
//   { id: 6, username: 'Mcdonalds', phoneNumber: '111222', email: 'macs@adproject.com', role: '1' },
//   { id: 7, username: 'KFC', phoneNumber: '333222', email: 'kfc@adproject.com', role: '1' },
//   { id: 8, username: 'BurgerKing', phoneNumber: '111222', email: 'burgerking@adproject.com', role: '1' }
// Add more data as needed
// ];

const columns = [
  // { header: 'ID', field: 'id'},
  { header: 'Username', field: 'username' },
  { header: 'Phone No.', field: 'phoneNumber' },
  { header: 'Email', field: 'email' },
  { header: 'Role', field: 'role' }
];

const labelField = 'header';

const ManageStaff = () => {
  //variables
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch(config.staff, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setStaff(data);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

  // const fetchStaff = async () => {
  //   fetch(config.getAllStaff, {
  //     headers: {
  //       // Authorization: 'Bearer ' + getJWTFromLS(),
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'GET'
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setStaff(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching staff data:', error);
  //     });
  // };
  // Map the data and update the "Role" field
  const updatedData = staff.map((item) => ({
    ...item,
    role: item.role === 0 ? 'Administrator' : item.role === 1 ? 'Moderator' : null // Return null if role is neither '0' nor '1'
  }));
  return (
    <MainCard title="Staff Information">
      <Typography variant="body2">
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

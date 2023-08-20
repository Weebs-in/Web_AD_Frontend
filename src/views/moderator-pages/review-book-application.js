// material-ui
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';

// mui-datagrid
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

// ==============================|| BOOK APPLICATIONS MANAGEMENT ||============================== //

function ApplicationToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ReviewApplications = () => {
  const apiRef = useGridApiRef();
  const [applications, setApplications] = useState([]);
  const [rows, setRows] = useState([]);
  // const [rowModesModel, setRowModesModel] = React.useState({});
  const VISIBLE_FIELDS = React.useMemo(() => ['id', 'book', 'donor', 'recipient', 'status', 'actions'], []);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    // Filter applications with status values 0,1
    // add more status codes to the array if you want to display
    const filteredApplications = applications.filter((application) => [0, 1].includes(application.status));

    setRows(filteredApplications);
  }, [applications]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(config.application, {
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
        console.log('Retrieved application data successfully');
        console.log(data);
        setApplications(data);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching application data:', error);
    }
  };

  // function for updating existing application status, called by handleActionClick
  const handleActionClick = useCallback(async (event, id, statusChange) => {
    event.preventDefault();
    console.log('status change: ', statusChange);
    let configPoint;
    if (statusChange === 'Approve') {
      configPoint = config.applicationApprove;
    } else if (statusChange === 'Ready') {
      configPoint = config.applicationReady;
    } else if (statusChange === 'Reject') {
      configPoint = config.applicationReject;
    }
    console.log('to PUT for ', statusChange, ': ', id);

    // Make the PUT request to the backend
    try {
      console.log('to PUT - Submitting form data:', id); // Log the data before making the PUT request
      const response = await fetch(configPoint + '/' + id, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Process the response data if needed
      const responseData = await response.json();
      console.log('Record updated:', responseData);

      // Fetch the updated application data
      await fetchApplications();
    } catch (error) {
      console.error('Error updating record:', error);
      // Fetch the updated application data
      await fetchApplications();
    }
  }, []);

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 80, align: 'left', headerAlign: 'left' },
      {
        field: 'book',
        headerName: 'Book',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
          <div>
            <div>
              <b>ID:</b> {params.row.book.id}
            </div>
            <div>
              <b>Title:</b> {params.row.book.title}
            </div>
          </div>
        )
      },
      {
        field: 'recipient',
        headerName: 'Recipient',
        type: 'string',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => {
          const recipient = params.row.recipient;
          return recipient ? recipient.username : '';
        }
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Pending' },
          { value: 1, label: 'Approved' },
          { value: 2, label: 'Rejected' },
          { value: 3, label: 'Ready for Collection' },
          { value: 4, label: 'Completed' }
        ]
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 300,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          console.log('getActions activated for ID:', id);

          // Buttons for Approved, Ready, and Rejected
          return [
            <Button
              key={`approve_${id}`}
              className="textPrimary"
              onClick={(event) => handleActionClick(event, id, 'Approve')}
              variant="contained"
              color="success"
            >
              Approve
            </Button>,
            <Button
              key={`ready_${id}`}
              className="textPrimary"
              onClick={(event) => handleActionClick(event, id, 'Ready')}
              variant="contained"
              color="warning"
            >
              Ready
            </Button>,
            <Button key={`reject_${id}`} onClick={(event) => handleActionClick(event, id, 'Reject')} variant="contained" color="error">
              Reject
            </Button>
          ];
        }
      }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [handleActionClick, VISIBLE_FIELDS]);

  return (
    <MainCard title="Applications for Books" style={{ overflow: 'auto' }}>
      <Typography variant="body2">
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          <DataGrid
            autoHeight
            {...rows}
            rows={rows}
            editMode="row"
            columns={columns}
            // rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            // onRowEditStop={handleRowEditStop}
            // processRowUpdate={processRowUpdate}
            apiRef={apiRef}
            slots={{
              toolbar: ApplicationToolbar
            }}
            // columnVisibilityModel={{
            //   // Hide column id, the other columns will remain visible
            //   id: false
            // }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            pageSizeOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Typography>
    </MainCard>
  );
};

export default ReviewApplications;

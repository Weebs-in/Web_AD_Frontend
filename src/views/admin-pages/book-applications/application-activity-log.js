/// material-ui
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

// mui-datagrid
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useEffect, useMemo, useState } from 'react';
import config from '../../../config';
import { getJWTFromLS } from '../../../utils/jwtUtils';
import { format } from 'date-fns';

// ==============================|| BOOK APPLICATIONS MANAGEMENT ||============================== //

function ApplicationToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ApplicationActivity = () => {
  const [applications, setApplications] = useState([]);
  const [rows, setRows] = useState([]);
  const VISIBLE_FIELDS = React.useMemo(
    () => ['application', 'book', 'donor', 'recipient', 'statusPrev', 'statusNow', 'roleUsername', 'roleType', 'actionTime'],
    []
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    setRows(applications);
  }, [applications]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(config.applicationTimestamp, {
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

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'uniqueid', width: 0 },
      {
        field: 'application',
        headerName: 'ID',
        type: 'string',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => {
          const appId = params.row.application;
          return appId ? appId.id : '';
        }
      },
      {
        field: 'book',
        headerName: 'Book',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => {
          console.log('params.row:', params.row);
          console.log('params.row.book:', params.row.application.book);

          return (
            <div>
              <div>
                <b>ID:</b> {params.row.application.book.id}
              </div>
              <div>
                <b>Title:</b> {params.row.application.book.title}
              </div>
            </div>
          );
        }
      },
      {
        field: 'recipient',
        headerName: 'Recipient',
        type: 'string',
        width: 150,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.application.recipient.username
      },
      {
        field: 'statusPrev',
        headerName: 'Previous \n Status',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Pending' },
          { value: 1, label: 'Approved' },
          { value: 2, label: 'Rejected' },
          { value: 3, label: 'Ready for Collection' },
          { value: 4, label: 'Completed' },
          { value: 5, label: 'Cancelled' },
          { value: 6, label: 'Disabled' }
        ]
      },
      {
        field: 'roleUsername',
        headerName: 'Action By',
        type: 'string',
        width: 120,
        align: 'left',
        headerAlign: 'left'
      },
      {
        field: 'roleType',
        headerName: 'Role',
        width: 80,
        align: 'left',
        headerAlign: 'left',
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Admin' },
          { value: 1, label: 'Moderator' },
          { value: 2, label: 'Member' }
        ]
      },
      {
        field: 'statusNow',
        headerName: 'Current \n Status',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Pending' },
          { value: 1, label: 'Approved' },
          { value: 2, label: 'Rejected' },
          { value: 3, label: 'Ready for Collection' },
          { value: 4, label: 'Completed' },
          { value: 5, label: 'Cancelled' },
          { value: 6, label: 'Disabled' }
        ]
      },
      {
        field: 'actionTime',
        headerName: 'Timestamp',
        width: 200,
        valueFormatter: (params) => format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
      }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [VISIBLE_FIELDS]);

  return (
    <MainCard title="Applications for Books - Activity Log" style={{ overflow: 'auto' }}>
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
            columns={columns}
            slots={{
              toolbar: ApplicationToolbar
            }}
            columnVisibilityModel={{
              // Hide column id, the other columns will remain visible
              id: false
            }}
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

export default ApplicationActivity;

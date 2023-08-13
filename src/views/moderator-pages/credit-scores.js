// material-ui
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

// mui-datagrid
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useEffect, useMemo, useState } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';
import Dot from '../../ui-component/extended/Dot';

// ==============================|| VIEW CREDIT SCORES ||============================== //

function CreditToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const StatusColour = ({ ratio }) => {
  let colour;
  let title;
  const status = ratio < 0.4 ? 0 : 1;

  switch (status) {
    case 0:
      colour = 'error';
      title = 'Review Required';
      break;
    default:
      colour = 'success';
      title = 'Auto-approval';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={colour} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

const CreditScores = () => {
  const [creditInfo, setCreditInfo] = useState([]);
  const [rows, setRows] = useState([]);
  const VISIBLE_FIELDS = React.useMemo(() => ['username', 'displayName', 'donationCount', 'receiveCount', 'ratio', 'status'], []);

  useEffect(() => {
    fetchCreditInfo();
  }, []);

  useEffect(() => {
    setRows(creditInfo);
  }, [creditInfo]);

  const fetchCreditInfo = async () => {
    try {
      const response = await fetch(config.ratio, {
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
        console.log('Retrieved credit score data successfully');
        console.log(data);
        setCreditInfo(data);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching credit score data:', error);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 0 // Setting width to 0 to hide the column
      },
      { field: 'username', type: 'string', headerName: 'Username', width: 200, align: 'left', headerAlign: 'left' },
      {
        field: 'displayName',
        headerName: 'Name',
        type: 'string',
        width: 200,
        align: 'left',
        headerAlign: 'left'
      },
      {
        field: 'donationCount',
        headerName: 'Donations',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left'
      },
      {
        field: 'receiveCount',
        headerName: 'Received',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left'
      },
      {
        field: 'ratio',
        headerName: 'Score',
        type: 'number',
        width: 80,
        align: 'left',
        headerAlign: 'left'
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 150,
        renderCell: (params) => {
          const ratio = params.row.ratio;
          return <StatusColour ratio={ratio} />;
        }
      }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [VISIBLE_FIELDS]);

  return (
    <MainCard title="Credit Scores">
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
              toolbar: () => <CreditToolbar />
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

export default CreditScores;

/// material-ui
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

// mui-datagrid
import {
  // useGridApiContext,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarExport,
  useGridApiRef
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import config from '../../../config';
import { getJWTFromLS } from '../../../utils/jwtUtils';
import { format } from 'date-fns';

// ==============================|| BOOK LISTINGS MANAGEMENT ||============================== //

function TransactionToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ManageListings = () => {
  const apiRef = useGridApiRef();
  const [transactions, setTransactions] = useState([]);
  const [rows, setRows] = useState([]);
  const VISIBLE_FIELDS = React.useMemo(
    () => ['createTime', 'book', 'donor', 'recipient', 'collectionPoint', 'status', 'completeTime', 'ratingDonor', 'ratingRecipient'],
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setRows(transactions);
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(config.transaction, {
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
        console.log('Retrieved transaction data successfully');
        console.log(data);
        setTransactions(data);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  const handleDeleteClick = useCallback(async (event, id) => {
    console.log('handleDeleteClick function called for ID:', id);
    try {
      const response = await fetch(config.transaction + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });

      console.log('Response Status:', response.status); // Log the status code

      if (response.ok) {
        console.log('Transaction deleted');
        await fetchTransactions(); // Fetch the updated book listing data
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error while deleting transaction', error);
    }
  }, []);

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 0 },
      {
        field: 'createTime',
        headerName: 'Date',
        width: 100,
        valueFormatter: (params) => format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
      },
      {
        field: 'book',
        headerName: 'Book',
        type: 'string',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.book.username
      },
      {
        field: 'donor',
        headerName: 'Donor',
        type: 'string',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.donor.username
      },
      {
        field: 'recipient',
        headerName: 'Recipient',
        type: 'string',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.recipient.username
      },
      {
        field: 'collectionPoint',
        headerName: 'Collection Point',
        type: 'string',
        width: 100,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.collectionPoint.name
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 80,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'In Progress' }, // to confirm with mobile team
          { value: 1, label: 'Completed' },
          { value: 2, label: 'Cancelled' }
        ]
      },
      {
        field: 'completeTime',
        headerName: 'Date Completed',
        width: 100,
        valueFormatter: (params) => format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
      },
      {
        field: 'bookCondition',
        headerName: 'Book Condition',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Brand New' },
          { value: 1, label: 'Like New' },
          { value: 2, label: 'Lightly Used' },
          { value: 3, label: 'Well Used' }
        ]
      },
      {
        field: 'ratingDonor',
        headerName: 'Donor Rating',
        type: 'number',
        width: 40
      },
      {
        field: 'ratingRecipient',
        headerName: 'Recipient Rating',
        type: 'number',
        width: 40
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 50,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          console.log('getActions activated for ID:', id);
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              key={`delete_${id}`}
              label="Delete"
              onClick={(event) => handleDeleteClick(event, id)}
              color="inherit"
            />
          ];
        }
      }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [handleDeleteClick, VISIBLE_FIELDS]);

  return (
    <MainCard title="Member Transactions">
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
            rows={rows}
            editMode="row"
            columns={columns}
            apiRef={apiRef}
            slots={{
              toolbar: TransactionToolbar
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

export default ManageListings;

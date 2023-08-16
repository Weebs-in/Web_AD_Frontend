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
  useGridApiRef,
  GridRowModes,
  GridRowEditStopReasons
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import config from '../../../config';
import { getJWTFromLS } from '../../../utils/jwtUtils';
import { format } from 'date-fns';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

// ==============================|| BOOK APPLICATIONS MANAGEMENT ||============================== //

function ApplicationToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ManageApplications = () => {
  const apiRef = useGridApiRef();
  const [applications, setApplications] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const VISIBLE_FIELDS = React.useMemo(() => ['id','createTime', 'book', 'donor', 'recipient', 'status', 'actions'], []);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    setRows(applications);
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

  // function for updating existing application, called by handleSaveClick
  const handleUpdateSubmit = useCallback(async (id, formData) => {
    console.log('to PUT - Form data before conversion to JSON:', formData);
    // Convert the form data to a JSON object
    const data = {};
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = typeof value === 'string' ? value.trim() : value;
    });

    // Make the PUT request to the backend
    try {
      console.log('to PUT - Submitting form data:', data); // Log the data before making the PUT request
      const response = await fetch(config.application + '/' + id, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
    }
  }, []);

  const processRowUpdate = useCallback((newRow) => {
    console.log('processRowUpdate for existing row:', JSON.stringify(newRow));
    setRows((rows) => rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = useCallback(
    async (event, id) => {
      event.preventDefault();
      console.log('handleEditClick function called for ID:', id);

      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    async (event, id) => {
      event.preventDefault();
      console.log('handleSaveClick function called for ID:', id);

      // Get the updated row data using getRowWithUpdatedValues
      const newRow = apiRef.current.getRowWithUpdatedValues(id);
      console.log('Updated row data from getRowWithUpdatedValues:', JSON.stringify(newRow));

      // Process the row update and get the updated row data
      const updatedRow = processRowUpdate(newRow);
      console.log('processRowUpdate invoked in handleSaveClick: ' + JSON.stringify(updatedRow));

      // Update the row mode to view after saving
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      await handleUpdateSubmit(id, updatedRow);
    },
    [apiRef, processRowUpdate, handleUpdateSubmit, rowModesModel]
  );

  const handleDeleteClick = useCallback(async (event, id) => {
    console.log('handleDeleteClick function called for ID:', id);
    try {
      const response = await fetch(config.application + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });

      console.log('Response Status:', response.status); // Log the status code

      if (response.ok) {
        console.log('Application deleted');
        await fetchApplications(); // Fetch the updated book listing data
      } else {
        console.error('Failed to delete application');
      }
    } catch (error) {
      console.error('Error while deleting application', error);
    }
  }, []);

  const handleCancelClick = useCallback(
    (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true }
      });
    },
    [rows, rowModesModel]
  );

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 80, align: 'left',
        headerAlign: 'left'},
      {
        field: 'createTime',
        headerName: 'Date',
        width: 100,
        valueFormatter: (params) => format(new Date(params.value), 'yyyy-MM-dd HH:mm:ss')
      },
      {
        field: 'book',
        headerName: 'Book',
        width: 200,
        align: 'left',
        headerAlign: 'left',
        renderCell: (params) => (
          <div>
            <div>{params.row.book.id}</div>
            <div>{params.row.book.title}</div>
          </div>
        )
      },
      {
        field: 'donor',
        headerName: 'Donor',
        type: 'string',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.donor.username
      },
      {
        field: 'recipient',
        headerName: 'Recipient',
        type: 'string',
        width: 120,
        align: 'left',
        headerAlign: 'left',
        valueGetter: (params) => params.row.recipient.username
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        type: 'singleSelect',
        editable: true,
        valueOptions: [
          { value: 0, label: 'Pending' },
          { value: 1, label: 'Approved' },
          { value: 2, label: 'Rejected' },
          { value: 3, label: 'Ready for Collection' },
          { value: 4, label: 'Completed' },
          { value: 5, label: 'Disabled' }
        ]
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          console.log('getActions activated for ID:', id);
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                key={`save_${id}`}
                label="Save"
                sx={{
                  color: 'primary.main'
                }}
                onClick={(event) => handleSaveClick(event, id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                key={`cancel_${id}`}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              key={`edit_${id}`}
              className="textPrimary"
              onClick={(event) => handleEditClick(event, id)}
              color="inherit"
            />,
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
  }, [handleCancelClick, handleDeleteClick, handleEditClick, handleSaveClick, rowModesModel, VISIBLE_FIELDS]);

  return (
    <MainCard title="Applications for Books" style={{overflow: 'auto'}}>
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
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
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

export default ManageApplications;

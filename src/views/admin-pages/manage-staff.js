// material-ui
import {Divider, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

// mui-datagrid
import {
  // useGridApiContext,
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarExport,
  GridToolbarFilterButton,
  useGridApiRef
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';
import { randomId } from '@mui/x-data-grid-generator';

// ==============================|| CRUD for Administrators and Moderators ||============================== //

function StaffToolBar(props) {
  // eslint-disable-next-line react/prop-types
  const { setRows, setRowModesModel } = props;

  const handleClick = (event) => {
    event.preventDefault();
    const id = randomId();
    const newRow = { id, username: '', phoneNumber: '', email: '', password: '123', role: 1, isNew: true };
    setRows((oldRows) => [newRow, ...oldRows]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ManageStaff = () => {
  //variables
  const apiRef = useGridApiRef();
  const [staff, setStaff] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const VISIBLE_FIELDS = React.useMemo(() => ['username', 'phoneNumber', 'email', 'password', 'role', 'actions'], []);

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    setRows(staff);
  }, [staff]);

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

  // function for creating new staff point, called by handleSaveClick
  const handleFormSubmit = useCallback(async (formData) => {
    console.log('to POST - Form data before conversion to JSON:', formData);
    // Convert the form data to a JSON object
    const data = {};
    Object.entries(formData).forEach(([key, value]) => {
      data[key] = typeof value === 'string' ? value.trim() : value;
    });

    // Remove the 'id' field from the data object as it is supposed to be created back-end
    delete data['id'];
    delete data['isNew'];

    // Make the POST request to the backend
    try {
      console.log('to POST - Submitting form data:', data); // Log the data before making the POST request
      const response = await fetch(config.staff, {
        method: 'POST',
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
      console.log('New record added:', responseData);

      // Fetch the updated staff data
      await fetchStaff();
    } catch (error) {
      console.error('Error adding new record:', error);
    }
  }, []);

  // function for updating existing staff point, called by handleSaveClick
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
      const response = await fetch(config.staff + '/' + id, {
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

      // Fetch the updated staff points data
      await fetchStaff();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  }, []);

  const processRowUpdate = useCallback((newRow) => {
    // Check if the row is an existing row (by checking the presence of 'id' property)
    const isExistingRow = Object.prototype.hasOwnProperty.call(newRow, 'id');

    if (isExistingRow) {
      // For existing rows, return the row as is (no updates needed)
      console.log('processRowUpdate for existing row:', JSON.stringify(newRow));
      setRows((rows) => rows.map((row) => (row.id === newRow.id ? newRow : row)));
      return newRow;
    } else {
      // For new rows, add the 'isNew' field and set it to false
      const updatedRow = { ...newRow, isNew: false };
      console.log('processRowUpdate for new row:', JSON.stringify(updatedRow));
      setRows((rows) => [...rows, updatedRow]);
      return updatedRow;
    }
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

      // Check if it's a new row (isNew property exists) or an existing row (isNew property is null or does not exist)
      if (Object.prototype.hasOwnProperty.call(updatedRow, 'isNew')) {
        // Call the handleFormSubmit function with the form data (excluding 'isNew')
        await handleFormSubmit(updatedRow);
      } else {
        // Call the handleUpdateSubmit function with the form data (excluding 'isNew')
        await handleUpdateSubmit(id, updatedRow);
      }
    },
    [apiRef, processRowUpdate, handleFormSubmit, handleUpdateSubmit, rowModesModel]
  );

  const handleDeleteClick = useCallback(async (event, id) => {
    console.log('handleDeleteClick function called for ID:', id);
    try {
      const response = await fetch(config.staff + '/' + id, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });

      console.log('Response Status:', response.status); // Log the status code

      if (response.ok) {
        console.log('Staff point deleted');
        await fetchStaff(); // Fetch the updated staff data
      } else {
        console.error('Failed to delete staff object');
      }
    } catch (error) {
      console.error('Error while deleting staff object:', error);
    }
  }, []);

  const handleCancelClick = useCallback(
    (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true }
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    },
    [rows, rowModesModel]
  );

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 0 },
      {
        field: 'username',
        headerName: 'Username',
        type: 'string',
        width: 150,
        align: 'left',
        headerAlign: 'left',
        editable: true
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        type: 'string',
        width: 150,
        editable: true
      },
      {
        field: 'email',
        headerName: 'Email Address',
        type: 'string',
        width: 200,
        editable: true
      },
      {
        field: 'password',
        headerName: 'Password',
        width: 150,
        renderCell: () => <span>••••••</span>
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 120,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Administrator' },
          { value: 1, label: 'Moderator' }
        ]
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id, row }) => {
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
          if (row.role === 0) {
            // Role is Administrator, don't show any icons, render blank
            return [];
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
    <MainCard title="Staff Information">
      <Typography variant="body2">
        <p>Please note: editing is disabled for fellow administrators and the moderator password/role fields.</p>
        <Divider />
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
            // isCellEditable={(params) => params.row.role === 0}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            apiRef={apiRef}
            slots={{
              toolbar: StaffToolBar
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel }
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
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Typography>
    </MainCard>
  );
};

export default ManageStaff;

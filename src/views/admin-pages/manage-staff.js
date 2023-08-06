// material-ui
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Close';

// mui-datagrid
import {
  // useGridApiContext,
  // GridRowModes,
  DataGrid,
  GridToolbarContainer,
  // GridActionsCellItem,
  // GridRowEditStopReasons,
  GridToolbarExport,
  GridToolbarFilterButton
  // useGridApiRef
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useEffect, useMemo, useState } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

// ==============================|| CRUD for Administrators and Moderators ||============================== //

function StaffToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const ManageStaff = () => {
  //variables
  const [staff, setStaff] = useState([]);
  const [rows, setRows] = useState([]);
  const VISIBLE_FIELDS = React.useMemo(() => ['username', 'phoneNumber', 'email', 'role'], []);

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

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 0 },
      {
        field: 'username',
        headerName: 'Username',
        type: 'string',
        width: 150,
        align: 'left',
        headerAlign: 'left'
        // editable: true
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        type: 'string',
        width: 150
        // editable: true
      },
      {
        field: 'email',
        headerName: 'Email Address',
        type: 'string',
        width: 200
        // editable: true
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 120,
        // editable: true,
        type: 'singleSelect',
        valueOptions: [
          { value: 0, label: 'Administrator' },
          { value: 1, label: 'Moderator' }
        ]
      }
      // {
      //   field: 'actions',
      //   type: 'actions',
      //   headerName: 'Actions',
      //   width: 100,
      //   cellClassName: 'actions',
      //   getActions: ({ id }) => {
      //     console.log('getActions activated for ID:', id);
      //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      //
      //     if (isInEditMode) {
      //       return [
      //         <GridActionsCellItem
      //             icon={<SaveIcon />}
      //             key={`save_${id}`}
      //             label="Save"
      //             sx={{
      //               color: 'primary.main'
      //             }}
      //             onClick={(event) => handleSaveClick(event, id)}
      //         />,
      //         <GridActionsCellItem
      //             icon={<CancelIcon />}
      //             key={`cancel_${id}`}
      //             label="Cancel"
      //             className="textPrimary"
      //             onClick={handleCancelClick(id)}
      //             color="inherit"
      //         />
      //       ];
      //     }return [
      //       <GridActionsCellItem
      //           icon={<EditIcon />}
      //           label="Edit"
      //           key={`edit_${id}`}
      //           className="textPrimary"
      //           onClick={(event) => handleEditClick(event, id)}
      //           color="inherit"
      //       />,
      //       <GridActionsCellItem
      //           icon={<DeleteIcon />}
      //           key={`delete_${id}`}
      //           label="Delete"
      //           onClick={(event) => handleDeleteClick(event, id)}
      //           color="inherit"
      //       />
      //     ];
      //   }
      // }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [VISIBLE_FIELDS]);

  return (
    <MainCard title="Staff Information">
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
            // editMode="row"
            columns={columns}
            // rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            // onRowEditStop={handleRowEditStop}
            // processRowUpdate={processRowUpdate}
            // apiRef={apiRef}
            slots={{
              toolbar: StaffToolBar
            }}
            // slotProps={{
            //   toolbar: { setRows, setRowModesModel }
            // }}
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

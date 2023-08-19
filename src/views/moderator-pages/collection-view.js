// material-ui
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';

// mui-datagrid
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import GoogleMap from '../../ui-component/maps/GoogleMap';

import React, { useEffect, useMemo, useState } from 'react';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';
// import Dot from '../../ui-component/extended/Dot';

// ==============================|| COLLECTION POINTS MANAGEMENT ||============================== //

function CollectionPointToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const CollectionView = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [collectionPointsCount, setCollectionPointsCount] = useState([]);
  // const [combinedData, setCombinedData] = useState({});
  const [rows, setRows] = useState([]);
  const VISIBLE_FIELDS = React.useMemo(() => ['name', 'address', 'status', 'actions', 'pendingCount', 'depositedCount'], []);

  // useEffect(() => {
  //   // Fetch collection points and count data
  //   const fetchData = async () => {
  //     try {
  //       const collectionPointsResponse = fetchCollectionPoints();
  //       const collectionPointsCountResponse = fetchCollectionPointsCount();
  //
  //       // Wait for both fetches to complete
  //       await Promise.all([collectionPointsResponse, collectionPointsCountResponse]);
  //
  //       // Combine collection points and counts data based on id
  //       const combined = {};
  //       collectionPoints.forEach((cp) => {
  //         const countData = collectionPointsCount.find((count) => count.id === cp.id);
  //         combined[cp.id] = { ...cp, ...countData };
  //       });
  //       console.log('combined: ', combined);
  //       // Update combined data state
  //       setCombinedData(combined);
  //
  //       // Map through the collection points to set rowModesModel
  //       const updatedRowModesModel = {};
  //       collectionPoints.forEach((cp) => {
  //         if (cp.isNew) {
  //           updatedRowModesModel[cp.id] = { mode: GridRowModes.Edit };
  //         } else {
  //           updatedRowModesModel[cp.id] = { mode: GridRowModes.View };
  //         }
  //       });
  //       setRowModesModel(updatedRowModesModel);
  //
  //       // Set the rows to be displayed in the DataGrid
  //       setRows(Object.values(combinedData));
  //     } catch (error) {
  //       console.error('Error fetching collection point and count data:', error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCollectionPoints();
        await fetchCollectionPointsCount();
      } catch (error) {
        console.error('Error fetching collection point data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Combine collection points and counts data based on id
    const combined = {};
    collectionPoints.forEach((cp) => {
      const countData = collectionPointsCount.find((count) => count.id === cp.id);
      combined[cp.id] = { ...cp, ...countData };
    });

    // Update combined data state
    // setCombinedData(combined);

    // Set the rows to be displayed in the DataGrid
    setRows(Object.values(combined));
    // check rows in grid
    console.log('combined rows: ', rows);
    // eslint-disable-next-line
  }, [collectionPoints, collectionPointsCount]);

  const fetchCollectionPoints = async () => {
    try {
      const response = await fetch(config.collectionPoint, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Retrieved collection point data successfully');
        console.log(data);
        setCollectionPoints(data);
      } else {
        const errorData = await response.text();
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching collection point data:', error);
    }
  };

  /// fetch counts of Pending and Deposited books
  const fetchCollectionPointsCount = async () => {
    try {
      const response = await fetch(config.collectionCount, {
        headers: {
          Authorization: 'Bearer ' + getJWTFromLS(),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });

      if (!response.ok) {
        // noinspection ExceptionCaughtLocallyJS
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        console.log('Retrieved collection point count data successfully');
        console.log(data);
        setCollectionPointsCount(data);
      } else {
        const errorData = await response.text();
        // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Invalid JSON response for collectionPointCount: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching collection point count data:', error);
    }
  };

  // status dot colour
  // const StatusColour = ({ ratio }) => {
  //   let colour;
  //   let title;
  //   const status = ratio < 0.4 ? 0 : 1;
  //
  //   switch (status) {
  //     case 0:
  //       colour = 'error';
  //       title = 'Review Required';
  //       break;
  //     default:
  //       colour = 'success';
  //       title = 'Auto-approval';
  //   }
  //
  //   return (
  //     <Stack direction="row" spacing={1} alignItems="center">
  //       <Dot color={colour} />
  //       <Typography>{title}</Typography>
  //     </Stack>
  //   );
  // };

  const columns = useMemo(() => {
    return [
      { field: 'id', headerName: 'ID', width: 0 },
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 250,
        align: 'left',
        headerAlign: 'left',
        editable: true
      },
      {
        field: 'address',
        headerName: 'Address',
        type: 'string',
        width: 400,
        editable: true
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: [
          { value: 1, label: 'Available' },
          { value: 0, label: 'Unavailable' }
        ]
        // valueGetter: (params) => {
        //   const statusValue = params.value; // Get the value of the 'status' field
        //   return (
        //     <Stack direction="row" spacing={1} alignItems="center">
        //       <StatusColour status={statusValue} />
        //       <span>{statusValue === 1 ? 'Available' : 'Unavailable'}</span>
        //     </Stack>
        //   );
        // }
      },
      {
        field: 'pendingCount',
        headerName: 'Books\nPending',
        width: 120,
        align: 'center',
        type: 'number'
      },
      {
        field: 'depositedCount',
        headerName: 'Books\nDeposited',
        width: 120,
        align: 'center',
        type: 'number'
      }
    ].filter((column) => VISIBLE_FIELDS.includes(column.field));
  }, [VISIBLE_FIELDS]);

  return (
    <MainCard title="Collection Points" style={{ overflow: 'auto' }}>
      <Typography variant="body2">
        <GoogleMap collectionPoints={collectionPoints} />
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
            slots={{
              toolbar: () => <CollectionPointToolbar setRows={setRows} />
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

export default CollectionView;

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party - use NumericFormat or PatternFormat in place of NumberFormat
// import { PatternFormat } from 'react-number-format';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

// project import
import Dot from 'ui-component/extended/Dot';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| TRANSACTION TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'bookId',
    align: 'left',
    disablePadding: false,
    label: 'Book Id'
  },
  {
    id: 'bookTitle',
    align: 'left',
    disablePadding: true,
    label: 'Book Title'
  },
  {
    id: 'donorUsername',
    align: 'center',
    disablePadding: false,
    label: 'Donor Username'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'bookCondition',
    align: 'center',
    disablePadding: false,
    label: 'Book Condition'
  }
];

// ==============================|| TRANSACTION TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| TRANSACTION TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    case 3:
      color = 'warning';
      title = 'Ready for Collection';
      break;
    case 4:
      color = 'success';
      title = 'Completed';
      break;
    case 5:
      color = 'warning';
      title = 'Disabled';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  // const BookConditionStatus = ({ status }) => {
  //   let color;
  //   let title;
  //
  //   switch (status) {
  //     case 0:
  //       color = 'warning';
  //       title = 'Brand New';
  //       break;
  //     case 1:
  //       color = 'success';
  //       title = 'Like New';
  //       break;
  //     case 2:
  //       color = 'error';
  //       title = 'Lightly Used';
  //       break;
  //     case 3:
  //       color = 'warning';
  //       title = 'Well Used';
  //       break;
  //     default:
  //       color = 'primary';
  //       title = 'None';
  //   }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| TRANSACTION TABLE ||============================== //

export default function TransactionTable() {
  const [order] = useState('asc');
  const [orderBy] = useState([]);
  const [selected] = useState([]);
  const [transactionData, setTransactionData] = useState([]); // State to store fetched transaction data

  useEffect(() => {
    fetchTransactionTable(); // Fetch data when the component mounts
  }, []);

  const isSelected = (transactionId) => selected.indexOf(transactionId) !== -1;

  const fetchTransactionTable = async () => {
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
        console.log('Retrieved transaction data successfully');
        console.log(data);
        setTransactionData(data); // Set fetched data in the state
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(transactionData, getComparator(order, orderBy))
              .slice(0, 10) // Only take the first 10 items
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="secondary" component={RouterLink} to="">
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.book.title}</TableCell>
                    <TableCell align="center">{row.book.donor.username}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.status} />
                    </TableCell>
                    {/*<TableCell align="center">*/}
                    {/*  <BookConditionStatus status={row.book.bookCondition} />*/}
                    {/*</TableCell>*/}
                    <TableCell align="center">{row.book.bookCondition}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

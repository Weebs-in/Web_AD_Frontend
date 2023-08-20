import React, { useState, useEffect } from 'react';
import {
  Avatar,
  // Button,
  // Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  Stack,
  Typography,
  ListItemText
} from '@mui/material';
import { GiftOutlined } from '@ant-design/icons';
import config from '../../config';
import { getJWTFromLS } from '../../utils/jwtUtils';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
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

        // Filter and sort completed transactions based on status and id
        const completedTransactions = data
          .filter((transaction) => transaction.status === 4) // Filter by completed status (status 4)
          .sort((a, b) => b.id - a.id) // Sort by ID in descending order
          .slice(0, 5); // Take the top 5 transactions

        setTransactions(completedTransactions);
      } else {
        const errorData = await response.text();
        throw new Error(`Invalid JSON response: ${errorData}`);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  return (
    <List
      component="nav"
      sx={{
        px: 0,
        py: 0,
        '& .MuiListItemButton-root': {
          py: 1.5,
          '& .MuiAvatar-root': {
            color: 'success.main',
            bgcolor: 'success.lighter'
          },
          '& .MuiListItemSecondaryAction-root': {
            position: 'center'
          }
        }
      }}
    >
      {transactions.map((transaction) => (
        <ListItemButton divider key={transaction.id}>
          <ListItemAvatar>
            <Avatar
              sx={{
                color: 'success.main',
                bgcolor: 'success.lighter'
              }}
            >
              <GiftOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={<Typography variant="subtitle1">Book Id #{transaction.book.id}</Typography>} />
          <ListItemSecondaryAction>
            <Stack alignItems="center" justifyContent="flex-end">
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="h6" color="primary" noWrap>
                Completed
              </Typography>
            </Stack>
          </ListItemSecondaryAction>
        </ListItemButton>
      ))}
    </List>
  );
};

export default TransactionHistory;

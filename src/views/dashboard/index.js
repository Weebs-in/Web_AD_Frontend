import { useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,
  Stack,
  Typography
} from '@mui/material';

// project import
import TransactionTable from './TransactionTable';
import BooksTransactionChart from './BooksTransactionChart';
import BooksStatusByMonthChart from './BooksStatusByMonthChart';
import MainCard from 'ui-component/cards/MainCard';
// import AnalyticEcommerce from 'ui-component/cards/statistics/AnalyticEcommerce';
import MonthlyLikedChart from './MonthlyLikedChart';
import AgeDemographicsChart from './AgeDemographicsChart';
import TransactionHistory from './TransactionHistory';
import BooksDepositByCP from './BooksDepositByCP';

// import SettingOutlined from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  // const [value, setValue] = useState('today');
  // const [slot, setSlot] = useState('week');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5" sx={{ fontSize: '2.0rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          Dashboard
        </Typography>
      </Grid>

      {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
      {/*  <AnalyticEcommerce title="Total Page Views" count="4,420,236" percentage={31.8} extra="140,564" />*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
      {/*  <AnalyticEcommerce title="Total Registered Users" count="138,250" percentage={45.2} extra="62,489" />*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
      {/*  <AnalyticEcommerce title="Total Book Listings" count="18,800" percentage={12.4} isLoss color="warning" extra="2,331" />*/}
      {/*</Grid>*/}
      {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
      {/*  <AnalyticEcommerce title="Total New Users Registration" count="26,815" percentage={24.8} extra="6650" />*/}
      {/*</Grid>*/}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Typography variant="h5">Number of books transaction</Typography>
        <MainCard content={false} sx={{ mt: 2.0 }}>
          <Box sx={{ pt: 1.0, pr: 2 }}>
            <BooksTransactionChart slot="month" /> {/* You can set 'slot' value directly here */}
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={7} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Number of Books Deposited at Collection Points</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2.0, height: '475px' }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {/*This Month Statistics*/}
              </Typography>
            </Stack>
          </Box>
          <BooksDepositByCP />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Top 10 most liked books</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 3.0 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Month Statistics
              </Typography>
            </Stack>
          </Box>
          <MonthlyLikedChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Demographic Breakdown by Age</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 3.0, height: '475px' }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {/*This Week Statistics*/}
              </Typography>
            </Stack>
          </Box>
          <AgeDemographicsChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Transactions</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TransactionTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TransactionHistory />
        </MainCard>
      </Grid>

      {/* row 5 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Monthly Books Statuses </Typography>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2.0 }}>
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Typography variant="h6" color="secondary">
              {/*Net Profit*/}
            </Typography>
          </Stack>
          <BooksStatusByMonthChart />
        </MainCard>
      </Grid>

      <Grid item xs={12} md={5} lg={4}>
        <MainCard sx={{ mt: 4.3 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;

// // material-ui
// import { Typography } from '@mui/material';
//
// // project imports
// import MainCard from 'ui-component/cards/MainCard';

import { getUserRoleFromLS } from '../../utils/jwtUtils';
import config from '../../config';

// ==============================|| SAMPLE PAGE ||============================== //

const Home = () => {
  const role = getUserRoleFromLS();
  if (role === config.USER_ROLE_ADMIN) {
    window.location.href = '/dashboard/default';
  } else if (role === config.USER_ROLE_MODERATOR) {
    window.location.href = '/moderator/collection-view';
  } else {
    window.location.href = '/login';
  }
  // return (
  //   <MainCard title="Welcome">
  //     <Typography variant="body2">Please click on the sidebar to get started with your tasks</Typography>
  //   </MainCard>
  // );
};

export default Home;

// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Home = () => {

  return (
    <MainCard title="Welcome">
      <Typography variant="body2">Please click on the sidebar to get started with your tasks</Typography>
    </MainCard>
  );
};

export default Home;

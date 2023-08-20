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
};

export default Home;

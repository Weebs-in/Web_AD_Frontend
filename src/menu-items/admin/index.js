import userManagement from './user-management';
import dashboard from '../dashboard';
import sysManagement from './system-management';

// ==============================|| MENU ITEMS ||============================== //

// const userType = moderator;

const menuItems = {
  items: [dashboard, userManagement, sysManagement]
};

export default menuItems;

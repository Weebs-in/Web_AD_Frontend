import userManagement from './user-management';
import dashboard from '../dashboard';
import sysManagement from './system-management';
import moderatorsModule from './moderators-module';

// ==============================|| MENU ITEMS ||============================== //

// const userType = moderator;

const menuItems = {
  items: [dashboard, userManagement, sysManagement, moderatorsModule]
};

export default menuItems;

// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import menuItemAdmin from 'menu-items/admin';
import menuItemMod from 'menu-items/moderator';
import config from '../../../../config';

// ==============================|| SIDEBAR MENU LIST ||============================== //

// eslint-disable-next-line react/prop-types
const MenuList = ({ userType }) => {
  // Hardcoded userType for testing purposes
  // Replace this with the actual prop passed from the parent component
  // For example: const userType = 'admin';
  // For testing with different userTypes, simply change the value here
  // const hardcodedUserType = 'moderator';

  // Select the appropriate menu-items array based on the user type
  let selectedMenuItems;
  console.log(selectedMenuItems);

  switch (userType) {
    case config.USER_ROLE_ADMIN:
      selectedMenuItems = menuItemAdmin;
      break;
    case config.USER_ROLE_MODERATOR:
      selectedMenuItems = menuItemMod;
      break;
    default:
      selectedMenuItems = menuItem; // Set to default when userType is not available or logged out
  }

  console.log('Selected Menu Items:', selectedMenuItems);

  // Handle the case when selectedMenuItems is null or empty
  if (!selectedMenuItems || selectedMenuItems.length === 0) {
    return (
      <Typography variant="h6" color="error" align="center">
        No Menu Items Available
      </Typography>
    );
  }

  const navItems = selectedMenuItems.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;

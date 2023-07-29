// assets
import { IconUser } from '@tabler/icons';

// constant
const icons = {
  IconUser
};

// ==============================|| 'FOR REVIEW' MENU ITEMS ||============================== //

const userManagement = {
  id: 'user-management',
  title: 'User Management',
  type: 'group',
  children: [
    {
      id: 'manage-staff',
      title: 'Staff',
      type: 'item',
      url: '/admin/manage-staff',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'manage-member',
      title: 'Members',
      type: 'item',
      url: '/admin/manage-member',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default userManagement;

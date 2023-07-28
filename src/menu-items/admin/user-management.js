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
      id: 'manage-admins',
      title: 'Administrators',
      type: 'item',
      url: '/admin/manage-admin',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'manage-members',
      title: 'Members',
      type: 'item',
      url: '/admin/manage-member',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'manage-mods',
      title: 'Moderators',
      type: 'item',
      url: '/admin/manage-mod',
      icon: icons.IconUser,
      breadcrumbs: false
    }
  ]
};

export default userManagement;

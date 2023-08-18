// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const ModDashboard = {
  id: 'collection-view',
  title: 'Overview',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Collection',
      type: 'item',
      url: '/moderator/collection-view',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default ModDashboard;

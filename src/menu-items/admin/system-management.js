// assets
import { IconBook, IconBuildingStore, IconNotes } from '@tabler/icons';

// constant
const icons = {
  IconBook,
  IconBuildingStore,
  IconNotes
};

// ==============================|| 'FOR REVIEW' MENU ITEMS ||============================== //

const sysManagement = {
  id: 'sys-management',
  title: 'System Management',
  type: 'group',
  children: [
    {
      id: 'book-data',
      title: 'Book Data',
      type: 'item',
      url: '/admin/book-data',
      icon: icons.IconBook,
      breadcrumbs: false
    },
    {
      id: 'manage-book-listings',
      title: 'Book Listings',
      type: 'item',
      url: '/admin/manage-listings',
      icon: icons.IconBook,
      breadcrumbs: false
    },
    {
      id: 'manage-pickup-points',
      title: 'Collection Points',
      type: 'item',
      url: '/admin/collection-points',
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    },
    {
      id: 'view-transaction-log',
      title: 'Transaction Log',
      type: 'item',
      url: '/admin/transaction-log',
      icon: icons.IconNotes,
      breadcrumbs: false
    }
  ]
};

export default sysManagement;

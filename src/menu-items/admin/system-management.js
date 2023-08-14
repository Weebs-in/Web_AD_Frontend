// assets
import { IconBasket, IconBook, IconBuildingStore, IconNotes } from '@tabler/icons';

// constant
const icons = {
  IconBasket,
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
      id: 'book-listings',
      title: 'Book Listings',
      type: 'collapse',
      icon: icons.IconBook,
      children: [
        {
          id: 'manage-book-listings',
          title: 'Management',
          type: 'item',
          url: '/admin/manage-listings',
          icon: icons.IconBook,
          breadcrumbs: false
        },
        {
          id: 'listing-activity-log',
          title: 'Activity Log',
          type: 'item',
          url: '/admin/listing-activity',
          icon: icons.IconBook,
          breadcrumbs: false
        },
      ]
    },
    {
      id: 'applications',
      title: 'Applications',
      type: 'collapse',
      icon: icons.IconBasket,
      children: [
        {
          id: 'manage-applications',
          title: 'Management',
          type: 'item',
          url: '/admin/manage-listings',
          icon: icons.IconBasket,
          breadcrumbs: false
        },
        {
          id: 'application-activity-log',
          title: 'Activity Log',
          type: 'item',
          url: '/admin/application-activity',
          icon: icons.IconBasket,
          breadcrumbs: false
        },
      ]
    },
    {
      id: 'manage-pickup-points',
      title: 'Collection Points',
      type: 'item',
      url: '/admin/collection-points',
      icon: icons.IconBuildingStore,
      breadcrumbs: false
    }
  ]
};

export default sysManagement;

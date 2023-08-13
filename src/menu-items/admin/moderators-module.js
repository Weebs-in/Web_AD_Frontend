// assets
import { IconUrgent, IconNumbers } from '@tabler/icons';

// constant
const icons = {
  IconUrgent,
  IconNumbers
};

// ==============================|| 'FOR REVIEW' MENU ITEMS ||============================== //

const ModeratorsModule = {
  id: 'moderators-module',
  title: 'Moderators Module',
  type: 'group',
  children: [
    {
      id: 'moderator-review',
      title: 'Review',
      type: 'collapse',
      icon: icons.IconUrgent,
      children: [
        {
          id: 'review-book-listings',
          title: 'Book Listings',
          type: 'item',
          url: '/moderator/review-book-listing',
          icon: icons.IconUrgent,
          breadcrumbs: false
        },
        {
          id: 'review-book-requests',
          title: 'Book Applications',
          type: 'item',
          url: '/moderator/review-book-application',
          icon: icons.IconUrgent,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'credit-scores-page',
      title: 'Credit Scores',
      type: 'item',
      url: '/moderator/credit-scores',
      icon: icons.IconNumbers,
      breadcrumbs: false
    }
  ]
};

export default ModeratorsModule;

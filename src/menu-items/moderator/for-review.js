// assets
import { IconUrgent } from '@tabler/icons';

// constant
const icons = {
  IconUrgent
};

// ==============================|| 'FOR REVIEW' MENU ITEMS ||============================== //

const forReview = {
  id: 'for-review',
  title: 'Review',
  type: 'group',
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
};

export default forReview;

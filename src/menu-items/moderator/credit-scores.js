// assets
import { IconNumbers } from '@tabler/icons';

// constant
const icons = {
  IconNumbers
};

// ==============================|| 'CREDIT-SCORE' MENU ITEMS ||============================== //

const creditScores = {
  id: 'credit-scores',
  type: 'group',
  children: [
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

export default creditScores;

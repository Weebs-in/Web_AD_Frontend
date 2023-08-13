import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// homepage routing
const Homepage = Loadable(lazy(() => import('views/pages/home')));

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Dashboard = Loadable(lazy(() => import('views/dashboard')));

// account settings
const UpdateProfile = Loadable(lazy(() => import('views/pages/update-profile')));
const ChangePassword = Loadable(lazy(() => import('views/pages/change-password')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// admin page routing
const ManageStaff = Loadable(lazy(() => import('views/admin-pages/manage-staff')));
const ManageListings = Loadable(lazy(() => import('views/admin-pages/book-listings/manage-listings')));
const ManageMember = Loadable(lazy(() => import('views/admin-pages/manage-member')));
const CollectionPoints = Loadable(lazy(() => import('views/admin-pages/collection-points/collection-points')));
const TransactionLog = Loadable(lazy(() => import('views/admin-pages/transaction-log/transaction-log')));
const BookData = Loadable(lazy(() => import('views/admin-pages/book-data')));

// moderator page routing
const CreditScores = Loadable(lazy(() => import('views/moderator-pages/credit-scores')));
const ReviewBookListing = Loadable(lazy(() => import('views/moderator-pages/review-book-listing')));
const ReviewApplication = Loadable(lazy(() => import('views/moderator-pages/review-book-application')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Homepage />
    },
    {
      path: 'update-profile',
      element: <UpdateProfile />
    },
    {
      path: 'change-password',
      element: <ChangePassword />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Dashboard />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'admin',
      children: [
        {
          path: 'manage-staff',
          element: <ManageStaff />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'manage-member',
          element: <ManageMember />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'manage-listings',
          element: <ManageListings />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'collection-points',
          element: <CollectionPoints />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'transaction-log',
          element: <TransactionLog />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'book-data',
          element: <BookData />
        }
      ]
    },
    {
      path: 'moderator',
      children: [
        {
          path: 'credit-scores',
          element: <CreditScores />
        }
      ]
    },
    {
      path: 'moderator',
      children: [
        {
          path: 'review-book-listing',
          element: <ReviewBookListing />
        }
      ]
    },
    {
      path: 'moderator',
      children: [
        {
          path: 'review-book-application',
          element: <ReviewApplication />
        }
      ]
    }
  ]
};

export default MainRoutes;

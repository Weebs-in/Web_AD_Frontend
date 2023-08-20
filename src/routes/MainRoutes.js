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

// admin page routing
const ManageStaff = Loadable(lazy(() => import('views/admin-pages/manage-staff')));
const ManageListings = Loadable(lazy(() => import('views/admin-pages/book-listings/manage-listings')));
const ListingActivity = Loadable(lazy(() => import('views/admin-pages/book-listings/listing-activity-log')));
const ManageMember = Loadable(lazy(() => import('views/admin-pages/manage-member')));
const CollectionPoints = Loadable(lazy(() => import('views/admin-pages/collection-points/collection-points')));
const ManageApplications = Loadable(lazy(() => import('views/admin-pages/book-applications/manage-applications')));
const ApplicationActivity = Loadable(lazy(() => import('views/admin-pages/book-applications/application-activity-log')));
const BookData = Loadable(lazy(() => import('views/admin-pages/book-data')));

// moderator page routing
const CreditScores = Loadable(lazy(() => import('views/moderator-pages/credit-scores')));
const ReviewBookListing = Loadable(lazy(() => import('views/moderator-pages/review-book-listing')));
const ReviewApplication = Loadable(lazy(() => import('views/moderator-pages/review-book-application')));
const CollectionView = Loadable(lazy(() => import('views/moderator-pages/collection-view')));

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
          path: 'listing-activity',
          element: <ListingActivity />
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
          path: 'manage-applications',
          element: <ManageApplications />
        }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'application-activity',
          element: <ApplicationActivity />
        }
      ]
    },
    {
      path: 'moderator',
      children: [
        {
          path: 'collection-view',
          element: <CollectionView />
        }
      ]
    },
    {
      path: 'moderator',
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

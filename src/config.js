const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '',
  defaultPath: '',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,

  // request codes
  REQUEST_SUCCESS: 1000,

  // user roles
  USER_ROLE_ADMIN: '0',
  USER_ROLE_MODERATOR: '1',

  // urls
  basicURL: 'http://localhost:3000', // this field is probably not going to be used
  loginUrl: '/login',
  logoutUrl: '/logout', // might not use

  // toasts
  TOAST_SUCCESS_COLOR: 'success',
  TOAST_SUCCESS_MSG: 'Successful',
  TOAST_FAILED_COLOR: 'danger',
  TOAST_FAILED_MSG: 'Failed',

  // staff functions
  getAllStaff: '/api/staff',
  getStaffById: '/api/staff/1',
  updateStaff: '/api/staff/15', // PUT
  deleteStaff: '/api/staff/16' // DELETE
};

export default config;

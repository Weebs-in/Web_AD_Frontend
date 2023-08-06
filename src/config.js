const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '',
  defaultPath: '',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,

  // request codes
  REQUEST_SUCCESS: 200,

  // user roles
  USER_ROLE_ADMIN: '0', //console.log indicates this is sys:admin
  USER_ROLE_MODERATOR: '1',

  // urls
  basicURL: 'http://localhost:3000', // this field is probably not going to be used
  loginUrl: '/auth/login',
  logoutUrl: '/logout', // might not use

  // toasts
  TOAST_SUCCESS_COLOR: 'success',
  TOAST_SUCCESS_MSG: 'Successful',
  TOAST_FAILED_COLOR: 'danger',
  TOAST_FAILED_MSG: 'Failed',

  // staff functions
  staff: '/api/staff',

  // member functions
  member: '/api/member',

  // collection point functions
  collectionPoint: '/api/collectionPoint',

  // book functions
  book: '/api/book',

  //application functions
  application: '/api/application'
};

export default config;

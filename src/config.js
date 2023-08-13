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
  USER_ROLE_ADMIN: 'sys:admin', //console.log indicates this is sys:admin
  USER_ROLE_MODERATOR: 'sys:moderator',

  // urls
  basicURL: 'http://localhost:3000', // this field is probably not going to be used
  logoutUrl: '/logout', // might not use

  // toasts
  TOAST_SUCCESS_COLOR: 'success',
  TOAST_SUCCESS_MSG: 'Successful',
  TOAST_FAILED_COLOR: 'danger',
  TOAST_FAILED_MSG: 'Failed',

  // CRUD functions explanation:
  // GET to retrieve all object
  // GET with /{id} to retrieve one object by id
  // POST to create one object
  // PUT with /{id} to update one object by id
  // DELETE with /{id} to delete one object by id

  // ==============================|| LOGIN FUNCTIONS ||============================== //
  loginUrl: '/auth/login',

  // ==============================|| STAFF FUNCTIONS ||============================== //
  // CRUD staff functions
  staff: '/api/staff',

  // ==============================|| MEMBER FUNCTIONS ||============================== //

  // CRUD member functions
  member: '/api/member',
  // GET to retrieve all members' credit information
  // GET with {id} to retrieve one member's ratio
  ratio: '/api/member/ratio',

  // ==============================|| COLLECTION POINT FUNCTIONS ||============================== //
  // CRUD collection point functions
  collectionPoint: '/api/collectionPoint',

  // CRUD book listing functions
  book: '/api/book',
  // GET with {id} to retrieve list of book listings (donated) by member id
  booksDonated: '/api/book/donor',
  // GET with {id} to retrieve list of book listings (successfully received) by member id
  booksReceived: '/api/book/recipient',

  // ==============================|| APPLICATION FUNCTIONS ||============================== //
  // CRUD application functions
  application: '/api/application',
  // GET with {id} to retrieve list of applications by member id
  applicationMember: '/api/application/member',

  // CRUD transaction functions
  transaction: '/api/transaction',

  // API Keys
  mapAPI: 'YOUR_GOOGLE_MAPS_API_KEY',
  bookAPI: 'YOUR_GOOGLE_BOOKS_API_KEY'
};

export default config;

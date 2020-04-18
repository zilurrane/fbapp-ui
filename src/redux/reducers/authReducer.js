import { isUserLoggedIn, getLoggedInUserInfo, storeLoggedInUserInfo, storeAuthToken, logOutUser } from '../../shared/helpers/storage-helpers';

const reducer = (state = {
  isUserLoggedIn: isUserLoggedIn(),
  loggedInUserInfo: getLoggedInUserInfo() || {},
  isLoginInProgress: false,
  isUserAccountVerified: false,
  isUserAccountVerificationInProgress: false,
  userAccountVerificationMessage: '',
}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoginInProgress: true,
        isUserLoggedIn: false,
      };
    case 'LOGIN_SUCCESS':
      storeLoggedInUserInfo(action.payload.loggedInUserInfo);
      storeAuthToken(action.payload.token);
      return {
        ...state,
        loggedInUserInfo: action.payload.loggedInUserInfo,
        isLoginInProgress: false,
        isUserLoggedIn: true,
      };
    case 'LOGOUT_USER':
      logOutUser();
      return {
        ...state,
        loggedInUserInfo: {},
        isLoginInProgress: false,
        isUserLoggedIn: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loggedInUserInfo: {},
        isLoginInProgress: false,
        isUserLoggedIn: false,
      };
    case 'VERIFY_ACCOUNT':
      return {
        ...state,
        isUserAccountVerificationInProgress: true,
      };
    case 'VERIFY_ACCOUNT_SUCCESS':
      return {
        ...state,
        isUserAccountVerificationInProgress: false,
        isUserAccountVerified: true,
        userAccountVerificationMessage: action.payload,
      };
    case 'VERIFY_ACCOUNT_FAILURE':
      return {
        ...state,
        isUserAccountVerificationInProgress: false,
        isUserAccountVerified: false,
        userAccountVerificationMessage: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;

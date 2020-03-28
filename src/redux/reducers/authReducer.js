import { isUserLoggedIn, getLoggedInUserInfo, storeLoggedInUserInfo, storeAuthToken, logOutUser } from '../../shared/helpers/storage-helpers';

const reducer = (state = {
  isUserLoggedIn: isUserLoggedIn(), loggedInUserInfo: getLoggedInUserInfo() || {}, isLoginInProgress: false,
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
    default:
      return state;
  }
};
export default reducer;

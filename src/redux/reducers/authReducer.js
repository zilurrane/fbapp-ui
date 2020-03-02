
const storeLoggedInUserInfo = loggedInUserInfo => localStorage.setItem('loggedInUserInfo', JSON.stringify(loggedInUserInfo));
const getLoggedInUserInfo = () => JSON.parse(localStorage.getItem('loggedInUserInfo') || '{}');
const isUserLoggedIn = () => !!localStorage.getItem('loggedInUserInfo');

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
      return {
        ...state,
        loggedInUserInfo: action.payload.loggedInUserInfo,
        isLoginInProgress: false,
        isUserLoggedIn: true,
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

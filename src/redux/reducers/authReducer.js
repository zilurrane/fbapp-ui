const reducer = (state = {
  isUserLoggedIn: false, loggedInUserInfo: {}, isLoginInProgress: false,
}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoginInProgress: true,
        isUserLoggedIn: false,
      };
    case 'LOGIN_SUCCESS':
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

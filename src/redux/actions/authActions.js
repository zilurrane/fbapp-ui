export const loginUser = loginUserRequest => ({
  type: 'LOGIN',
  payload: loginUserRequest,
});

export const logOutUser = () => ({
  type: 'LOGOUT_USER',
});

export const confirmUserAccount = token => ({
  type: 'VERIFY_ACCOUNT',
  token,
});

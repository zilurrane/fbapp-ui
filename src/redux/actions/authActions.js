export const loginUser = loginUserRequest => ({
  type: 'LOGIN',
  payload: loginUserRequest,
});

export const logOutUser = () => ({
  type: 'LOGOUT_USER',
});

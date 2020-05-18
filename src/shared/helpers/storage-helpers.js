export const storeLoggedInUserInfo = loggedInUserInfo => localStorage.setItem('loggedInUserInfo', JSON.stringify(loggedInUserInfo));

export const storeAuthToken = token => localStorage.setItem('token', token);

export const getLoggedInUserInfo = () => JSON.parse(localStorage.getItem('loggedInUserInfo') || '{}');

export const getAuthToken = () => localStorage.getItem('token');

export const isUserLoggedIn = () => !!localStorage.getItem('loggedInUserInfo');

export const logOutUser = () => localStorage.clear();

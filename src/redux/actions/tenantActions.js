export const getAllTenants = () => ({
  type: 'GET_TENANTS',
});

export const createTenant = tenantRequest => ({
  type: 'CREATE_TENANT',
  tenantRequest,
});

export const setSelectedTenant = selectedTenant => ({
  type: 'SET_SELECTED_TENANT',
  selectedTenant,
});

export const getAllUsers = () => ({
  type: 'GET_USERS',
});

export const createUser = userRequest => ({
  type: 'CREATE_USER',
  userRequest,
});

export const updateUser = userRequest => ({
  type: 'UPDATE_USER',
  userRequest,
});

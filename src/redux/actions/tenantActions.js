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

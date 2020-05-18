import { getAuthToken } from './storage-helpers';

export const callApi = (requestInfoParams, tenantId, requestInitParams = {}) => {
  const token = getAuthToken();
  return fetch(requestInfoParams, {
    ...requestInitParams,
    headers: {
      ...requestInitParams.headers,
      Authorization: `Bearer ${token}`,
      TenantId: tenantId,
    },
  });
};

export const callUnAuthApi = (requestInfoParams, requestInitParams = {}) => fetch(requestInfoParams, {
  ...requestInitParams,
  headers: {
    ...requestInitParams.headers,
  },
});

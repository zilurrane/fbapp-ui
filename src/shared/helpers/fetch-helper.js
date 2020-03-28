import { getAuthToken } from './storage-helpers';

export const callApi = (requestInfoParams, requestInitParams = {}) => {
  const token = getAuthToken();
  return fetch(requestInfoParams, {
    ...requestInitParams,
    headers: {
      ...requestInitParams.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

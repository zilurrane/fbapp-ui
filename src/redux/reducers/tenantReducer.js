/* eslint-disable prefer-destructuring */
const reducer = (state = {
  tenants: [], isTenantsLoadingInProgress: false, isUsersLoadingInProgress: false, selectedTenant: {}, users: [],
}, action) => {
  switch (action.type) {
    case 'GET_TENANTS':
      return {
        ...state,
        isTenantsLoadingInProgress: true,
      };
    case 'GET_USERS':
      return {
        ...state,
        isUsersLoadingInProgress: true,
      };
    case 'TENANTS_RECEIVED': {
      let selectedTenant = {};
      if (state.selectedTenant && state.selectedTenant.code) {
        selectedTenant = state.selectedTenant;
      } else if (action.payload.tenants && action.payload.tenants.length > 0) {
        selectedTenant = action.payload.tenants[0];
      }
      return {
        ...state,
        tenants: action.payload.tenants,
        isTenantsLoadingInProgress: false,
        selectedTenant,
      };
    }
    case 'USERS_RECEIVED': {
      return {
        ...state,
        users: action.payload.users,
        isUsersLoadingInProgress: false,
      };
    }
    case 'SET_SELECTED_TENANT':
      return {
        ...state,
        selectedTenant: action.selectedTenant,
      };
    default:
      return state;
  }
};
export default reducer;

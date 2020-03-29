const reducer = (state = {
  tenants: [], isTenantsLoadingInProgress: false,
}, action) => {
  switch (action.type) {
    case 'GET_TENANTS':
      return {
        ...state,
        isTenantsLoadingInProgress: true,
      };
    case 'TENANTS_RECEIVED':
      return {
        ...state,
        tenants: action.payload.tenants,
        isTenantsLoadingInProgress: false,
      };
    default:
      return state;
  }
};
export default reducer;

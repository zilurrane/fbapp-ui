const reducer = (state = { loading: false, departments: [] }, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENTS':
      return { ...state, loading: true };
    case 'DEPARTMENTS_RECEIVED':
      return { ...state, departments: action.payload, loading: false };
    default:
      return state;
  }
}
export default reducer;

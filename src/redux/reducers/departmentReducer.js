const reducer = (state = { loading: false, departments: [], classes: {} }, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENTS':
      return { ...state, loading: true };
    case 'DEPARTMENTS_RECEIVED':
      return { ...state, departments: action.payload, loading: false };
    case 'CREATE_DEPARTMENT':
      return { ...state, loading: true };
    case 'GET_CLASSES_BY_DEPARTMENTCODE':
      return { ...state, loading: true };
    case 'CLASSES_BY_DEPARTMENTCODE_RECEIVED':
      return { ...state, classes: { ...state.classes, [action.payload.departmentCode]: action.payload.classes }, loading: true };
    case 'CREATE_CLASS':
      return { ...state, loading: true };
    default:
      return state;
  }
};
export default reducer;

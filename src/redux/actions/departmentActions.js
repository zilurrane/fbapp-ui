export const getAllDepartments = () => ({
  type: 'GET_DEPARTMENTS',
});

export const createDepartment = departmentRecord => ({
  type: 'CREATE_DEPARTMENT',
  payload: departmentRecord,
});

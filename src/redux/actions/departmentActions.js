export const getAllDepartments = () => ({
  type: 'GET_DEPARTMENTS',
});

export const createDepartment = departmentRecord => ({
  type: 'CREATE_DEPARTMENT',
  payload: departmentRecord,
});

export const getAllClassesByDepartmentCode = departmentCode => ({
  type: 'GET_CLASSES_BY_DEPARTMENTCODE',
  departmentCode,
});

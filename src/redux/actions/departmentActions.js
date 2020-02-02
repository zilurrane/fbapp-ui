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

export const createClass = classRecord => ({
  type: 'CREATE_CLASS',
  payload: classRecord,
});

export const getAllSubjectsByDepartmentCodeClassCode = (departmentCode, classCode) => ({
  type: 'GET_SUBJECT_BY_DEPARTMENTCODE_CLASSCODE',
  departmentCode,
  classCode,
});

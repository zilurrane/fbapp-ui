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
  type: 'GET_SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE',
  departmentCode,
  classCode,
});

export const createSubject = subjectRecord => ({
  type: 'CREATE_SUBJECT',
  payload: subjectRecord,
});

export const getAllFacultiesByDepartmentCode = departmentCode => ({
  type: 'GET_FACULTIES_BY_DEPARTMENTCODE',
  departmentCode,
});

export const createFaculty = facultyRecord => ({
  type: 'CREATE_FACULTY',
  payload: facultyRecord,
});

export const linkFacultyToSubject = facultySubjectRecord => ({
  type: 'LINK_FACULTY_TO_SUBJECT',
  payload: facultySubjectRecord,
});

export const getFacultiesLinkedToSubject = subjectId => ({
  type: 'GET_LINKED_FACULTIES_TO_SUBJECT',
  payload: subjectId,
});

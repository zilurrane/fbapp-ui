import { put, takeLatest, all } from 'redux-saga/effects';

const baseApiUrl = 'https://fbapp-api.cfapps.io/api/';

function* getAllDepartments() {
  const response = yield fetch(`${baseApiUrl}departments`).then(res => res.json());
  yield put({ type: 'DEPARTMENTS_RECEIVED', payload: response });
}

function* createDepartment({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}departments/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_DEPARTMENTS' });
}

function* getClassesByDepartmentCode({ departmentCode }) {
  const classes = yield fetch(`${baseApiUrl}classes/department/${departmentCode}`).then(res => res.json());
  yield put({ type: 'CLASSES_BY_DEPARTMENTCODE_RECEIVED', payload: { departmentCode, classes } });
}

function* createClass({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}classes/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_CLASSES_BY_DEPARTMENTCODE', departmentCode: payload.departmentCode });
}

function* getSubjectsByDepartmentCodeClassCode({ departmentCode, classCode }) {
  const subjects = yield fetch(`${baseApiUrl}subjects/department/${departmentCode}/class/${classCode}`).then(res => res.json());
  yield put({ type: 'SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, subjects } });
}

function* createSubject({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}subjects/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE', departmentCode: payload.departmentCode, classCode: payload.classCode });
}

function* getFacultiesByDepartmentCode({ departmentCode }) {
  const faculties = yield fetch(`${baseApiUrl}faculties/department/${departmentCode}`).then(res => res.json());
  yield put({ type: 'FACULTIES_BY_DEPARTMENTCODE_RECEIVED', payload: { departmentCode, faculties } });
}

function* createFaculty({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}faculties/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_FACULTIES_BY_DEPARTMENTCODE', departmentCode: payload.departmentCode });
}

function* linkFacultyToSubject({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}subjects/link/faculty`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
}

function* getLinkedFacultiesToSubject({ payload }) {
  const subjectId = payload;
  const linkedFaculties = yield fetch(`${baseApiUrl}subjects/link/faculty/${subjectId}`).then(res => res.json());
  yield put({ type: 'LINKED_FACULTIES_TO_SUBJECT_RECEIVED', payload: { subjectId, linkedFaculties } });
}

function* generateStudents({ payload }) {
  const generateStudentsRequestBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}students/generate`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: generateStudentsRequestBody }).then(res => res.json());
  // yield put({ type: 'GET_STUDENTS_BY_DEPARTMENTCODE_CLASSCODE', departmentCode: payload.departmentCode, classCode: payload.classCode });
}

function* actionWatcher() {
  yield all([
    takeLatest('GET_DEPARTMENTS', getAllDepartments),
    takeLatest('CREATE_DEPARTMENT', createDepartment),
    takeLatest('CREATE_CLASS', createClass),
    takeLatest('GET_CLASSES_BY_DEPARTMENTCODE', getClassesByDepartmentCode),
    takeLatest('GET_SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE', getSubjectsByDepartmentCodeClassCode),
    takeLatest('CREATE_SUBJECT', createSubject),
    takeLatest('GET_FACULTIES_BY_DEPARTMENTCODE', getFacultiesByDepartmentCode),
    takeLatest('CREATE_FACULTY', createFaculty),
    takeLatest('LINK_FACULTY_TO_SUBJECT', linkFacultyToSubject),
    takeLatest('GET_LINKED_FACULTIES_TO_SUBJECT', getLinkedFacultiesToSubject),
    takeLatest('GENERATE_STUDENTS', generateStudents),
  ]);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

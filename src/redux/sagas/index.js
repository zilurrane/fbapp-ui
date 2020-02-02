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

function* actionWatcher() {
  yield all([
    takeLatest('GET_DEPARTMENTS', getAllDepartments),
    takeLatest('CREATE_DEPARTMENT', createDepartment),
    takeLatest('CREATE_CLASS', createClass),
    takeLatest('GET_CLASSES_BY_DEPARTMENTCODE', getClassesByDepartmentCode),
    takeLatest('GET_SUBJECT_BY_DEPARTMENTCODE_CLASSCODE', getSubjectsByDepartmentCodeClassCode),
  ]);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

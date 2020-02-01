import { put, takeLatest, all } from 'redux-saga/effects';

const baseApiUrl = 'https://fbapp-api.cfapps.io/api/';

function* fetchDepartments() {
  const response = yield fetch(`${baseApiUrl}departments`).then(res => res.json());
  yield put({ type: 'DEPARTMENTS_RECEIVED', payload: response });
}

function* createDepartment({ payload }) {
  const postBody = JSON.stringify(payload);
  yield fetch(`${baseApiUrl}departments/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_DEPARTMENTS' });
}

function* actionWatcher() {
  yield all([
    takeLatest('GET_DEPARTMENTS', fetchDepartments),
    takeLatest('CREATE_DEPARTMENT', createDepartment),
  ]);
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

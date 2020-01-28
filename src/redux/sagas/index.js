import { put, takeLatest, all } from 'redux-saga/effects';

const baseApiUrl = 'https://fbapp-api.cfapps.io/api/';

function* fetchDepartments() {
  const response = yield fetch(`${baseApiUrl}departments`).then(res => res.json());
  yield put({ type: 'DEPARTMENTS_RECEIVED', payload: response });
}
function* actionWatcher() {
  yield takeLatest('GET_DEPARTMENTS', fetchDepartments);
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

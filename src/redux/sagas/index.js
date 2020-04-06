/* eslint-disable no-underscore-dangle */
import { put, takeLatest, all, select } from 'redux-saga/effects';
import { callApi } from '../../shared/helpers/fetch-helper';

const baseApiUrl = 'https://fbapp-api.cfapps.io/api/';
const baseGraphQLUrl = 'https://fbapp-api.cfapps.io/graphql';

const getSelectedTenantId = state => (state.tenant.selectedTenant || {})._id;

function* getAllDepartments() {
  const tenantId = yield select(getSelectedTenantId);
  const response = yield callApi(`${baseApiUrl}departments`, tenantId).then(res => res.json());
  yield put({ type: 'DEPARTMENTS_RECEIVED', payload: response });
}

function* createDepartment({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}departments/add`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_DEPARTMENTS' });
}

function* getClassesByDepartmentCode({ departmentCode }) {
  const tenantId = yield select(getSelectedTenantId);
  const classes = yield callApi(`${baseApiUrl}classes/department/${departmentCode}`, tenantId).then(res => res.json());
  yield put({ type: 'CLASSES_BY_DEPARTMENTCODE_RECEIVED', payload: { departmentCode, classes } });
}

function* createClass({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}classes/add`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_CLASSES_BY_DEPARTMENTCODE', departmentCode: payload.departmentCode });
}

function* getSubjectsByDepartmentCodeClassCode({ departmentCode, classCode }) {
  const tenantId = yield select(getSelectedTenantId);
  const subjects = yield callApi(`${baseApiUrl}subjects/department/${departmentCode}/class/${classCode}`, tenantId).then(res => res.json());
  yield put({ type: 'SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, subjects } });
}

function* createSubject({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}subjects/add`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_SUBJECTS_BY_DEPARTMENTCODE_CLASSCODE', departmentCode: payload.departmentCode, classCode: payload.classCode });
}

function* getFacultiesByDepartmentCode({ departmentCode }) {
  const tenantId = yield select(getSelectedTenantId);
  const faculties = yield callApi(`${baseApiUrl}faculties/department/${departmentCode}`, tenantId).then(res => res.json());
  yield put({ type: 'FACULTIES_BY_DEPARTMENTCODE_RECEIVED', payload: { departmentCode, faculties } });
}

function* createFaculty({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}faculties/add`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_FACULTIES_BY_DEPARTMENTCODE', departmentCode: payload.departmentCode });
}

function* linkFacultyToSubject({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}subjects/link/faculty`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
}

function* getLinkedFacultiesToSubject({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const subjectId = payload;
  const linkedFaculties = yield callApi(`${baseApiUrl}subjects/link/faculty/${subjectId}`, tenantId).then(res => res.json());
  yield put({ type: 'LINKED_FACULTIES_TO_SUBJECT_RECEIVED', payload: { subjectId, linkedFaculties } });
}

function* generateStudents({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const generateStudentsRequestBody = JSON.stringify(payload);
  yield callApi(`${baseApiUrl}students/generate`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: generateStudentsRequestBody }).then(res => res.json());
  yield put({ type: 'GET_STUDENTS_BY_DEPARTMENTCODE_CLASSCODE', departmentCode: payload.departmentCode, classCode: payload.classCode });
}

function* getStudentsByDepartmentCodeClassCode({ departmentCode, classCode }) {
  const tenantId = yield select(getSelectedTenantId);
  const getStudentsQuery = {
    query: `{ studentsByDepartmentCodeClassCode(departmentCode: "${departmentCode}", classCode: "${classCode}") { id createdDate user { userName isActive } } }`,
  };
  const studentsResponse = yield callApi(
    `${baseGraphQLUrl}`,
    tenantId,
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(getStudentsQuery),
    }).then(res => res.json());
  yield put({ type: 'STUDENTS_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, students: studentsResponse.data.studentsByDepartmentCodeClassCode } });
}

function* loginUser({ payload }) {
  const tenantId = yield select(getSelectedTenantId);
  const loginUserRequestBody = JSON.stringify(payload);
  const userLoginResponse = yield callApi(`${baseApiUrl}auth/login`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: loginUserRequestBody }).then(res => res.json());
  if (userLoginResponse && userLoginResponse.token && userLoginResponse.data) {
    yield put({ type: 'LOGIN_SUCCESS', payload: { loggedInUserInfo: userLoginResponse.data, token: userLoginResponse.token } });
  } else {
    yield put({ type: 'LOGIN_FAILURE' });
  }
}

function* getAllFeedbackParameters() {
  const tenantId = yield select(getSelectedTenantId);
  const getFeedbackParametersQuery = {
    query: 'query Feedbackparameters { feedbackParameters { id, code, question, type, marks, options { value, label } } }',
  };
  const feedbackParametersResponse = yield callApi(`${baseGraphQLUrl}`, tenantId, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(getFeedbackParametersQuery),
  }).then(res => res.json());
  yield put({ type: 'FEEDBACK_PARAMETERS_RECEIVED', payload: { feedbackParameters: feedbackParametersResponse.data.feedbackParameters } });
}

function* getFacultiesByDepartmentCodeClassCode({ departmentCode, classCode, studentId }) {
  const tenantId = yield select(getSelectedTenantId);
  const query = {
    query: `
            query facultiesByDepartmentCodeClassCode {
              facultiesByDepartmentCodeClassCode(departmentCode: "${departmentCode}", classCode: "${classCode}", studentId: "${studentId}") {
                subjects {
                  id
                  name
                  code
                  parameters
                }
                isFeedbackSubmitted
                faculty {
                  id
                  name
                  qualification
                }
              }
            }`,
  };
  const facultiesResponse = yield callApi(`${baseGraphQLUrl}`, tenantId, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(query),
  }).then(res => res.json());
  yield put({ type: 'FACULTIES_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, faculties: facultiesResponse.data.facultiesByDepartmentCodeClassCode } });
}

function* submitFeedback({ feedbackRequest }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(feedbackRequest);
  const feedbackResponse = yield callApi(`${baseApiUrl}feedbacks/add`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'SUBMIT_FEEDBACK_DONE', payload: { feedbackResponse } });
  const { departmentCode, classCode, student } = feedbackRequest;
  yield put({
    type: 'GET_FACULTIES_BY_DEPARTMENTCODE_CLASSCODE',
    departmentCode,
    classCode,
    studentId: student,
  });
}

function* getFacultiesFeedbackSummary({ departmentCode, classCode }) {
  const tenantId = yield select(getSelectedTenantId);
  const query = {
    query: `
      query facultiesFeedbackSummary {
        facultiesFeedbackSummary(departmentCode: "${departmentCode}", classCode: "${classCode}") {
          faculty {
            id
            name
          }
          feedback {
            percentage
          }
        }
      }`,
  };
  const response = yield callApi(`${baseGraphQLUrl}`, tenantId, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(query),
  }).then(res => res.json());
  yield put({ type: 'FACULTIES_FEEDBACK_SUMMARY_RECEIVED', payload: { departmentCode, classCode, facultiesFeedbackSummary: response.data.facultiesFeedbackSummary } });
}


function* getFacultyFeedback({ departmentCode, classCode, facultyId }) {
  const tenantId = yield select(getSelectedTenantId);
  const query = {
    query: `
    query facultyFeedback {
      facultyFeedback(departmentCode: "${departmentCode}", classCode: "${classCode}", facultyId: "${facultyId}") {
        parameter { code },
        feedback { percentage }
      }
    }
    `,
  };
  const response = yield callApi(`${baseGraphQLUrl}`, tenantId, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(query),
  }).then(res => res.json());
  yield put({
    type: 'FACULTY_FEEDBACK_RECEIVED',
    payload: {
      departmentCode,
      classCode,
      facultyId,
      facultyFeedback: response.data.facultyFeedback,
    },
  });
}

function* getTenants() {
  const tenantId = yield select(getSelectedTenantId);
  const tenants = yield callApi(`${baseApiUrl}tenants`, tenantId).then(res => res.json());
  yield put({ type: 'TENANTS_RECEIVED', payload: { tenants } });
}

function* createTenant({ tenantRequest }) {
  const tenantId = yield select(getSelectedTenantId);
  const postBody = JSON.stringify(tenantRequest);
  yield callApi(`${baseApiUrl}tenants/create`, tenantId, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
  yield put({ type: 'GET_TENANTS' });
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
    takeLatest('GET_FACULTIES_BY_DEPARTMENTCODE_CLASSCODE', getFacultiesByDepartmentCodeClassCode),
    takeLatest('CREATE_FACULTY', createFaculty),
    takeLatest('LINK_FACULTY_TO_SUBJECT', linkFacultyToSubject),
    takeLatest('GET_LINKED_FACULTIES_TO_SUBJECT', getLinkedFacultiesToSubject),
    takeLatest('GENERATE_STUDENTS', generateStudents),
    takeLatest('GET_STUDENTS_BY_DEPARTMENTCODE_CLASSCODE', getStudentsByDepartmentCodeClassCode),
    takeLatest('LOGIN', loginUser),
    takeLatest('GET_FEEDBACK_PARAMETERS', getAllFeedbackParameters),
    takeLatest('SUBMIT_FEEDBACK', submitFeedback),
    takeLatest('GET_FACULTIES_FEEDBACK_SUMMARY', getFacultiesFeedbackSummary),
    takeLatest('GET_FACULTY_FEEDBACK', getFacultyFeedback),
    takeLatest('GET_TENANTS', getTenants),
    takeLatest('CREATE_TENANT', createTenant),
  ]);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

import { put, takeLatest, all } from 'redux-saga/effects';

const baseApiUrl = 'https://fbapp-api.cfapps.io/api/';
const baseGraphQLUrl = 'https://fbapp-api.cfapps.io/graphql';

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
  yield put({ type: 'GET_STUDENTS_BY_DEPARTMENTCODE_CLASSCODE', departmentCode: payload.departmentCode, classCode: payload.classCode });
}

function* getStudentsByDepartmentCodeClassCode({ departmentCode, classCode }) {
  const getStudentsQuery = {
    query: `{ studentsByDepartmentCodeClassCode(departmentCode: "${departmentCode}", classCode: "${classCode}") { id userName createdDate isActive }}`,
  };
  const studentsResponse = yield fetch(`${baseGraphQLUrl}`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: JSON.stringify(getStudentsQuery) }).then(res => res.json());
  yield put({ type: 'STUDENTS_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, students: studentsResponse.data.studentsByDepartmentCodeClassCode } });
}

function* loginUser({ payload }) {
  const loginUserRequestBody = JSON.stringify(payload);
  const userLoginResponse = yield fetch(`${baseApiUrl}users/login`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: loginUserRequestBody }).then(res => res.json());
  if (userLoginResponse && userLoginResponse.token && userLoginResponse.data) {
    yield put({ type: 'LOGIN_SUCCESS', payload: { loggedInUserInfo: userLoginResponse.data } });
  } else {
    yield put({ type: 'LOGIN_FAILURE' });
  }
}

function* getAllFeedbackParameters() {
  const getFeedbackParametersQuery = {
    query: 'query Feedbackparameters { feedbackParameters { id, code, question, type, marks, options { value, label } } }',
  };
  const feedbackParametersResponse = yield fetch(`${baseGraphQLUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(getFeedbackParametersQuery),
  }).then(res => res.json());
  yield put({ type: 'FEEDBACK_PARAMETERS_RECEIVED', payload: { feedbackParameters: feedbackParametersResponse.data.feedbackParameters } });
}

function* getFacultiesByDepartmentCodeClassCode({ departmentCode, classCode, studentId }) {
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
  const facultiesResponse = yield fetch(`${baseGraphQLUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(query),
  }).then(res => res.json());
  yield put({ type: 'FACULTIES_BY_DEPARTMENTCODE_CLASSCODE_RECEIVED', payload: { departmentCode, classCode, faculties: facultiesResponse.data.facultiesByDepartmentCodeClassCode } });
}

function* submitFeedback({ feedbackRequest }) {
  const postBody = JSON.stringify(feedbackRequest);
  const feedbackResponse = yield fetch(`${baseApiUrl}feedbacks/add`, { headers: { 'Content-Type': 'application/json' }, method: 'POST', body: postBody }).then(res => res.json());
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
  const response = yield fetch(`${baseGraphQLUrl}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(query),
  }).then(res => res.json());
  yield put({ type: 'FACULTIES_FEEDBACK_SUMMARY_RECEIVED', payload: { departmentCode, classCode, facultiesFeedbackSummary: response.data.facultiesFeedbackSummary } });
}


function* getFacultyFeedback({ departmentCode, classCode, facultyId }) {
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
  const response = yield fetch(`${baseGraphQLUrl}`, {
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
  ]);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}

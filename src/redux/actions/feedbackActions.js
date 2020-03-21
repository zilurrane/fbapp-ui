export const getAllFeedbackParameters = () => ({
  type: 'GET_FEEDBACK_PARAMETERS',
});

export const submitFeedback = feedbackRequest => ({
  type: 'SUBMIT_FEEDBACK',
  feedbackRequest,
});

export const getFacultiesFeedbackSummary = (departmentCode, classCode) => ({
  type: 'GET_FACULTIES_FEEDBACK_SUMMARY',
  departmentCode,
  classCode,
});

export const getFacultyFeedback = (departmentCode, classCode, facultyId) => ({
  type: 'GET_FACULTY_FEEDBACK',
  departmentCode,
  classCode,
  facultyId,
});

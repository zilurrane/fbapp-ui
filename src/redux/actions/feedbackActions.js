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

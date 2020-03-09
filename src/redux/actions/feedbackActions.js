export const getAllFeedbackParameters = () => ({
  type: 'GET_FEEDBACK_PARAMETERS',
});

export const submitFeedback = feedbackRequest => ({
  type: 'SUBMIT_FEEDBACK',
  feedbackRequest,
});

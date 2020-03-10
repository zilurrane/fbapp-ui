const reducer = (state = {
  feedbackParameters: [],
}, action) => {
  switch (action.type) {
    case 'GET_FEEDBACK_PARAMETERS':
      return {
        ...state,
        loading: true,
      };
    case 'SUBMIT_FEEDBACK':
      return {
        ...state,
        isFeedbackSubmissionInProgress: true,
      };
    case 'FEEDBACK_PARAMETERS_RECEIVED':
      return { ...state, feedbackParameters: action.payload.feedbackParameters, loading: false };
    case 'SUBMIT_FEEDBACK_DONE':
      return {
        ...state,
        isFeedbackSubmissionInProgress: false,
      };
    default:
      return state;
  }
};
export default reducer;

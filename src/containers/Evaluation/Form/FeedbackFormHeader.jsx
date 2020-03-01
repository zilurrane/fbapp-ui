import React from 'react';
import PropTypes from 'prop-types';

const FeedbackFormHeader = ({ userName }) => (
  <div className="account__head">
    <h3 className="account__title">
      Hi {userName}, Welcome to
      <span className="account__logo"> Fb<span className="account__logo-accent">App</span>
      </span>
    </h3>
    <h4 className="account__subhead subhead">Feedback Analytics that matters!!!</h4>
  </div>);

FeedbackFormHeader.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default FeedbackFormHeader;

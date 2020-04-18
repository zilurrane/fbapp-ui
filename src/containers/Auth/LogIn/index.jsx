import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import LogInForm from './components/LogInForm';
import { loginUser, confirmUserAccount } from '../../../redux/actions/authActions';

const onLoginFormSubmit = (formValues, loginUserAction) => {
  const { userName, password } = formValues;
  if (userName && password) {
    loginUserAction({ userName, password });
  }
};

const LogIn = ({
  loginUserAction,
  confirmUserAccountAction,
  isUserLoggedIn,
  loggedInUserInfo,
  isAccountConfirmationRoute,
  isUserAccountVerified,
  isUserAccountVerificationInProgress,
  userAccountVerificationMessage,
  match,
}) => {
  if (isAccountConfirmationRoute && !isUserAccountVerified && !isUserAccountVerificationInProgress) {
    confirmUserAccountAction(match.params.token);
  }

  if (isUserLoggedIn && !isAccountConfirmationRoute) {
    switch (loggedInUserInfo.role) {
      case 5:
        return <Redirect to="/evaluation/form" />;
      case 1:
      case 2:
      case 3:
      case 4:
        return <Redirect to="/app/dashboard" />;
      default:
        break;
    }
  }

  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="alert-container">
          {
            match.params.token && userAccountVerificationMessage &&
            <Alert
              message={isUserAccountVerified ? 'Verification Successful!' : 'Verification Failed'}
              description={userAccountVerificationMessage}
              type={isUserAccountVerified ? 'success' : 'error'}
            />
          }
        </div>
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">Welcome to
              <span className="account__logo"> Fb
                <span className="account__logo-accent">App</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Feedback Analytics that matters!!!</h4>
          </div>
          <LogInForm onSubmit={formValues => onLoginFormSubmit(formValues, loginUserAction)} />
        </div>
      </div>
    </div>);
};

LogIn.propTypes = {
  loginUserAction: PropTypes.func.isRequired,
  confirmUserAccountAction: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isUserAccountVerified: PropTypes.bool.isRequired,
  isUserAccountVerificationInProgress: PropTypes.bool.isRequired,
  userAccountVerificationMessage: PropTypes.string.isRequired,
  isAccountConfirmationRoute: PropTypes.bool.isRequired,
  loggedInUserInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    role: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }),
};

LogIn.defaultProps = {
  match: {
    params: {
      token: '',
    },
  },
};

const mapStateToProps = (state, props) => ({
  isUserLoggedIn: state.auth.isUserLoggedIn,
  loggedInUserInfo: state.auth.loggedInUserInfo,
  isUserAccountVerified: state.auth.isUserAccountVerified,
  isUserAccountVerificationInProgress: state.auth.isUserAccountVerificationInProgress,
  userAccountVerificationMessage: state.auth.userAccountVerificationMessage,
  isAccountConfirmationRoute: state.auth.userAccountVerificationMessage ? false : props.isAccountConfirmationRoute,
});

const mapDispatchToProps = {
  loginUserAction: loginUser,
  confirmUserAccountAction: confirmUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LogInForm from './components/LogInForm';
import { loginUser } from '../../../redux/actions/authActions';

const onLoginFormSubmit = (formValues, loginUserAction) => {
  const { userName, password } = formValues;
  if (userName && password) {
    loginUserAction({ userName, password });
  }
};

const LogIn = ({ loginUserAction, isUserLoggedIn }) => {
  if (isUserLoggedIn) {
    return <Redirect to="evaluation/form" />;
  }

  return (
    <div className="account">
      <div className="account__wrapper">
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
  isUserLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ isUserLoggedIn: state.auth.isUserLoggedIn, loggedInUserInfo: state.auth.loggedInUserInfo });
const mapDispatchToProps = { loginUserAction: loginUser };
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

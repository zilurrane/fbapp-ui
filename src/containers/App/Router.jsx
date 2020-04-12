/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../Auth/LogIn/index';
import ExamplePageOne from '../Example/index';
import ExamplePageTwo from '../ExampleTwo/index';
import DashboardPage from './Pages/Dashboard';
import Error404Page from './Pages/Error404';
import TenantsPage from './Pages/Tenants';
import UsersPage from './Pages/Users';
import ClassesPage from './Pages/Classes';
import FacultiesPage from './Pages/Faculties';
import SubjectsPage from './Pages/Subjects';
import StudentsPage from './Pages/Students';
import BackupPage from './Pages/Backup';
import analyticsPage from './Pages/Analytics';
import EvaluationFormPage from '../Evaluation/Form';
import { studentRoleValue } from '../../shared/constants/common-constants';

const ProtectedRouteComponent = ({
  isUserLoggedIn,
  loggedInUserInfo,
  selectedTenant,
  ...props
}) => (
  isUserLoggedIn
    ? (((selectedTenant && selectedTenant._id) || loggedInUserInfo.role === studentRoleValue) ? <Route {...props} /> : <div>Please select any tenant</div>)
    :
    <Redirect to="/auth/login" />);

const mapStateToProps = state => ({ isUserLoggedIn: state.auth.isUserLoggedIn, selectedTenant: state.tenant.selectedTenant, loggedInUserInfo: state.auth.loggedInUserInfo });
const mapDispatchToProps = null;
const ProtectedRoute = connect(mapStateToProps, mapDispatchToProps)(ProtectedRouteComponent);

const authRoutes = () => (
  <Switch>
    <Route exact path="/auth/login" component={LogIn} />
  </Switch>
);

const evaluationRoutes = () => (
  <Switch>
    <ProtectedRoute exact path="/evaluation/form" component={EvaluationFormPage} />
  </Switch>
);

const appRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Switch>
        <ProtectedRoute path="/app/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/app/tenants" component={TenantsPage} />
        <ProtectedRoute path="/app/users" component={UsersPage} />
        <ProtectedRoute path="/app/classes" component={ClassesPage} />
        <ProtectedRoute path="/app/faculties" component={FacultiesPage} />
        <ProtectedRoute path="/app/subjects" component={SubjectsPage} />
        <ProtectedRoute path="/app/students" component={StudentsPage} />
        <ProtectedRoute path="/app/analytics" component={analyticsPage} />
        <ProtectedRoute path="/app/backup" component={BackupPage} />
        {/* TEST */}
        <ProtectedRoute path="/app/one" component={ExamplePageOne} />
        <ProtectedRoute path="/app/two" component={ExamplePageTwo} />
        <ProtectedRoute path="/app" component={Error404Page} />
      </Switch>
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route path="/auth" component={authRoutes} />
        <Route path="/evaluation" component={evaluationRoutes} />
        <Route path="/app" component={appRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;

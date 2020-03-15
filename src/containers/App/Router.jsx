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
import UsersPage from './Pages/Users';
import ClassesPage from './Pages/Classes';
import FacultiesPage from './Pages/Faculties';
import SubjectsPage from './Pages/Subjects';
import StudentsPage from './Pages/Students';
import BackupPage from './Pages/Backup';
import analyticsPage from './Pages/Analytics';
import EvaluationFormPage from '../Evaluation/Form';

const ProtectedRouteComponent = ({ isUserLoggedIn, ...props }) => (isUserLoggedIn ? <Route {...props} /> : <Redirect to="/auth/login" />);

const mapStateToProps = state => ({ isUserLoggedIn: state.auth.isUserLoggedIn });
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
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/users" component={UsersPage} />
        <Route path="/app/classes" component={ClassesPage} />
        <Route path="/app/faculties" component={FacultiesPage} />
        <Route path="/app/subjects" component={SubjectsPage} />
        <Route path="/app/students" component={StudentsPage} />
        <Route path="/app/analytics" component={analyticsPage} />
        <Route path="/app/backup" component={BackupPage} />
        {/* TEST */}
        <Route path="/app/one" component={ExamplePageOne} />
        <Route path="/app/two" component={ExamplePageTwo} />
        <Route path="/app" component={Error404Page} />
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

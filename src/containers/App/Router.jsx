import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
import FeedbackPage from './Pages/Feedback';
import EvaluationFormPage from '../Evaluation/Form';

const authRoutes = () => (
  <Switch>
    <Route exact path="/auth/login" component={LogIn} />
  </Switch>
);

const evaluationRoutes = () => (
  <Switch>
    <Route exact path="/evaluation/form" component={EvaluationFormPage} />
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
        <Route path="/app/backup" component={BackupPage} />
        <Route path="/app/feedback" component={FeedbackPage} />
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

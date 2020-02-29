import { combineReducers, createStore, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { sidebarReducer, themeReducer, departmentReducer, authReducer } from '../../redux/reducers/index';
import rootSaga from '../../redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  departments: departmentReducer,
  auth: authReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);
sagaMiddleware.run(rootSaga);

export default store;

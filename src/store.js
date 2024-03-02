import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import loginReducer from './reducers/userSlice';
import registrationReducer from './reducers/userRegistrationSlice';
import jobsDetails from './reducers/jobsDetails';
import jobsAllReducer from './reducers/jobsAllSlice';
import todosReducer from './reducers/todoSlice';
import savedJobsReducer from './reducers/savedJobsSlice';

import rootSaga from './sagas/index';

const rootReducer = combineReducers({
    user: loginReducer,
    registration: registrationReducer,
    todos: todosReducer,
    jobsDetails: jobsDetails,
    jobsAll: jobsAllReducer,
    savedJobs: savedJobsReducer,
});

// Configure persist reducer
const persistConfig = {
    key: 'root',
    blacklist: ['todos', 'jobsDetails', 'jobsAll', 'savedJobs'],
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Create the persistor object
export const persistor = persistStore(store);

// then run the saga
sagaMiddleware.run(rootSaga);
import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ForgotPasswordForm from './components/ForgotPassword/ForgotPasswordForm';
import PrivateRoute from './PrivateRoute';
import RouteNotFound from './RouteNotFound';
import { store, persistor } from './store';
import './tailwind-index.css';
import { Theme } from '@radix-ui/themes';

const JobBoard = lazy(() => import('./components/JobBoard/JobBoard'));
const SavedJobs = lazy(() => import('./components/SavedJobs/SavedJobs'));

const fallbackRender = ({ error }) => <ErrorFallback error={error} />;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route index element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/forgot" element={<ForgotPasswordForm />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Theme>
                    <Layout />
                  </Theme>
                </PrivateRoute>
              }
            >
              <Route
                path="/dashboard"
                element={<div>Dashboard to implement</div>}
              />
              <Route
                path="/job-board"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <JobBoard />
                    </Suspense>
                  </PrivateRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <PrivateRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <SavedJobs />
                    </Suspense>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Outlet />} />
            </Route>
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

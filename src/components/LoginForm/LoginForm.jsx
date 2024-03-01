import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthHoc from '../AuthHoc/AuthHoc';
import Notification from '../common/Notification';

function LoginForm() {
  const [message, setMessage] = useState('');
  const authenticated = useSelector((state) => state.user.authenticated);
  const error = useSelector((state) => state.user.error);
  const isLoading = useSelector((state) => state.user.isLoading);
  const registration = useSelector((state) => state.registration.registration);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usernameRef = useRef('');
  const passwordRef = useRef('');

  useEffect(() => {
    // Redirect if user is authenticated
    if (authenticated) {
      navigate('/dashboard'); // Redirect to dashboard or any desired route
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    // Redirect if user is authenticated
    if (registration) {
      const { status, emails } = registration;
      if (status === 'PENDING')
        setMessage(
          `Please check your email ${emails[0].value} to activate your account before logging in.`
        );
    }
  }, [registration]);

  const validateEntry = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(value);
    console.log(name);
  };

  const handleOnSubmit = async () => {
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;
    dispatch({
      type: 'USER_LOGIN_REQUESTED',
      payload: { username: usernameInput, password: passwordInput },
    });
  };

  return (
    <AuthHoc
      page='login'
      title="Sign in to platform"
      backButtonOnClick={() => navigate('/registration')}
      backButtonText="Go to Registration"
    >
      <div className="form_input">
        <label htmlFor="username">User name</label>
        <input
          disabled={isLoading}
          name="username"
          type="text"
          onChange={validateEntry}
          ref={usernameRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="form_input">
        <label htmlFor="password">Password</label>
        <input
          disabled={isLoading}
          name="password"
          type="password"
          onChange={validateEntry}
          ref={passwordRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="flex gap-2">
        <button
          disabled={isLoading}
          type="button"
          onClick={handleOnSubmit}
          className="basis-1/2 mt-4 text-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-300 transition-color duration-200 delay-100"
        >
          Login
        </button>
      </div>
      {error && (
        <Notification
          text={error}
          className="bg-red-400 text-white rounded p-1 my-2 border"
        />
      )}
      {message && (
        <Notification
          text={message}
          className="text-white rounded p-1 my-2 border bg-sky-600"
        />
      )}
    </AuthHoc>
  );
}

export default LoginForm;

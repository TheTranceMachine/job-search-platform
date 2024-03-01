import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHoc from '../AuthHoc/AuthHoc';
import Notification from '../common/Notification';
import { forgottenPasswordEmail } from '../../api/api';

const ForgotPasswordForm = () => {
  const [message, setMessage] = useState('');
  const usernameRef = useRef('');

  const navigate = useNavigate();

  const sendForgottenPasswordEmail = async () => {
    const username = usernameRef.current.value;
    const send = await forgottenPasswordEmail({ username });
    setMessage(send.data.message);
  };

  useEffect(() => {
    if (message !== '') {
      const hide = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => {
        clearTimeout(hide);
      };
    }
  }, [message]);

  return (
    <AuthHoc
      page="forgot_password"
      title="Forgot Password"
      backButtonOnClick={() => navigate('/login')}
      backButtonText="Go to Login"
    >
      <div className="form_input">
        <label htmlFor="email">Username</label>
        <input
          required
          name="username"
          type="text"
          ref={usernameRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        We’ll send a verification code to this user's email if it matches an
        existing account.
      </div>
      <div className="flex gap-2">
        <button
          onClick={sendForgottenPasswordEmail}
          className="basis-1/2 mt-4 text-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-300 transition-color duration-200 delay-100"
        >
          Send code
        </button>
      </div>
      {message && (
        <Notification
          text={message}
          className="text-white rounded p-1 my-2 border bg-sky-600"
        ></Notification>
      )}
    </AuthHoc>
  );
};

export default ForgotPasswordForm;

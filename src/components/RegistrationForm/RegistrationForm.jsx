import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrationEmailResend } from '../../api/api';
import AuthHoc from '../AuthHoc/AuthHoc';
import Notification from '../common/Notification';
import { emailValid, passValid } from '../common/validators';

function RegistrationForm() {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const registration = useSelector((state) => state.registration.registration);
  const registrationError = useSelector((state) => state.registration.error);
  const isLoading = useSelector((state) => state.registration.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(registration);
  console.log(registrationError);
  console.log(isLoading);

  useEffect(() => {
    if (errors.length) {
      const hide = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => {
        clearTimeout(hide);
      };
    }
  }, [errors]);

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

  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const repeatPasswordRef = useRef('');

  const handleOnSubmit = () => {
    const userInput = usernameRef.current.value;
    const emailInput = emailRef.current.value;
    const passwordInput = passwordRef.current.value;
    const repeatPasswordInput = repeatPasswordRef.current.value;
    const errors = [];

    if (userInput === '' || emailInput === '' || passwordInput === '') {
      errors.push({ message: 'All fields are required' });
    }

    if (!emailValid(emailInput)) {
      errors.push({ message: 'Email is not valid' });
    }

    if (!passValid(passwordInput)) {
      errors.push({
        message:
          'Password must be at least 8 long and no longer than 16 characters long, contain 1 number, 1 lowercase letter, 1 uppercase letter and 1 special character',
      });
    }

    if (passwordInput !== repeatPasswordInput) {
      errors.push({ message: "Repeated password doesn't match the password" });
    }

    if (errors.length) {
      setErrors(errors);
    } else {
      dispatch({
        type: 'USER_REGISTRATION_REQUESTED',
        payload: {
          userName: userInput,
          email: emailInput,
          password: passwordInput,
        },
      });
    }
  };

  const resendEmail = async () => {
    const { id } = registration;
    console.log(id);
    const resend = await registrationEmailResend({ id });
    if (resend.data.message === 'Verification email sent') {
      setMessage('Verification email sent');
    }
  };

  return (
    <AuthHoc
      page='registration'
      title="Register to the platform"
      backButtonOnClick={() => navigate('/login')}
      backButtonText="Go to Login"
    >
      <div className="form_input">
        <label htmlFor="username">Username</label>
        <input
          required
          name="username"
          type="text"
          ref={usernameRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="form_input">
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="email"
          ref={emailRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="form_input">
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          type="password"
          ref={passwordRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
      </div>
      <div className="form_input">
        <label htmlFor="password">Repeat Password</label>
        <input
          required
          name="repeat_password"
          type="password"
          ref={repeatPasswordRef}
          className="w-full border border-gray-300 mb-4 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
      </div>
      <div className="flex gap-2">
        <button
          disabled={isLoading}
          onClick={handleOnSubmit}
          className="basis-1/2 mt-4 text-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-300 transition-color duration-200 delay-100"
        >
          Register
        </button>
      </div>
      {errors &&
        errors.map(({ message }) => (
          <Notification
            key={message}
            text={message}
            className="bg-red-400 text-white rounded p-1 my-2 border"
          />
        ))}
      {registrationError && (
        <Notification
          text={registrationError}
          className="bg-red-400 text-white rounded p-1 my-2 border"
        />
      )}
      {message && (
        <Notification
          text={message}
          className="text-white rounded p-1 my-2 border bg-sky-600"
        >
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-300 text-white text-sm py-1 px-2 rounded self-center"
            onClick={resendEmail}
          >
            Resend email
          </button>
        </Notification>
      )}
    </AuthHoc>
  );
}

export default RegistrationForm;

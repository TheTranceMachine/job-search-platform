import { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../reducers/userSlice';

function RegistrationForm() {
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);
        console.log(name);
    };

    const handleOnSubmit = async () => {
        const emailInput = emailRef.current.value;
        const passwordInput = passwordRef.current.value;
        // implement a call to cloud function with cloudant
        try {
            const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVICE_URL}/login`, { "email": emailInput, "password": passwordInput });
            console.log(response);
            if (response.data.body) {
                dispatch(authenticateUser(true));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="form_input">
                <label for="email">Email</label>
                <input
                    name="email"
                    value={emailRef.current.value}
                    onChange={handleChange}
                    ref={emailRef}
                />
            </div>
            <div className="form_input">
                <label for="password">Password</label>
                <input
                    name="password"
                    value={passwordRef.current.value}
                    onChange={handleChange}
                    ref={passwordRef}
                />
            </div>
            <button onClick={handleOnSubmit}>Login</button>
        </>
    );
}

export default RegistrationForm;

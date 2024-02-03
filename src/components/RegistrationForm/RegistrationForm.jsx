import { useRef, useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
    const [error, setError] = useState('');
    const usernameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);
        console.log(name);
    };

    const handleOnSubmit = async () => {
        const userInput = usernameRef.current.value;
        const emailInput = emailRef.current.value;
        const passwordInput = passwordRef.current.value;
        // implement a call to cloud function with cloudant
        try {
            const response = await axios.post('http://localhost:8080/register', { "name": userInput, "email": emailInput, "password": passwordInput });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="form_input">
                <label for="username">Username</label>
                <input
                    name="username"
                    value={usernameRef.current.value}
                    onChange={handleChange}
                    ref={usernameRef}
                />
            </div>
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
            <button onClick={handleOnSubmit}>Register</button>
        </>
    );
}

export default RegistrationForm;

import React, {useState} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import LoginDto from "@/dtos/loginDto";

export default function Login() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const loginDto: LoginDto = {
                "email": email,
                "password": password
            };

            // Send a POST request to the backend to authenticate the user.
            const response = await axios.post('http://localhost:5000/auth/login', loginDto);

            if (response.status === 200) {
                // On successful login store the JWT token in local storage
                const token = response.data.token;
                if (token) {
                    localStorage.setItem('token', token);
                }
                // Redirect to the home page
                await router.push('/');
            } else {
                // The user didn't successfully log in with their username and password.
                // Do something on the form or a modal to let them know to try again.
            }

        } catch (error) {
            console.log(`Something went wrong: ${error}`);
            // Let the user try logging in again
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
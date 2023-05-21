import React, { useState } from 'react';
import axios from 'axios';
import RegisterDto from "@/dtos/registerDto";
import {useRouter} from "next/router";

export default function Register() {

    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegisterSubmit = async (e: React.FormEvent) => {
       e.preventDefault();

       try {
           const registerDto: RegisterDto = {
               "username": username,
               "email": email,
               "password": password
           };

           const response = await axios.post('http://localhost:5000/auth/register', registerDto);

           if (response.status === 200) {
               // Registered successfully
               const token = response.data.token;
               if (token) {
                   localStorage.setItem('token', token);
               }
               // Redirect to the home page
               await router.push('/');
           }
       } catch (error) {
           console.log(error);
       }
    }

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
}
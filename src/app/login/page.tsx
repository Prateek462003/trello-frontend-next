"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import Cookies from 'js-cookie';

interface LoginData {
    email: string;
    password: string;
}

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch("https://trello-backend-node.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText);
                return;
            }

            const data = await response.json();
            console.log(data);

            dispatch(setUser({ id: data._id, username:data.username }));

            Cookies.set('access_token', data.token, { expires: 1, secure: true, sameSite: 'Strict' });
            
            router.push("/dashboard")
        } catch (err) {
            setError("An error occurred during login!!");
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-400">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome to <span className="text-blue-500">WorkFlo!</span></h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                placeholder="Your email"
                                type="email"
                                id="email"
                                value={loginData.email}
                                onChange={handleChange}
                                name="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                placeholder="Password"
                                type="password"
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
                    </form>
                    <p className="mt-4 text-center text-gray-700">
                        Do not have an account? <Link href="/" className="text-blue-500">Create a new Account.</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

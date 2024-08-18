import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig';

export default function LoginForm({ isOpen, onClose }) {
    const [loginform, setLoginform] = useState({
        'email' : '',
        'password' : ''
    })

    const handlechange = (e) => {
        e.preventDefault();
        const {name, value} = e.target
        console.log("name: ",name)
        console.log("value: ",value)

        setLoginform(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(loginform);

    }


    const handleSubmit = async (e) => {
        e.preventDefault(); 
    
        try {
            const response = await axiosInstance.post('api/login/', loginform, 
                {
                withCredentials: true,  
                }
            ); 
            console.log("Login response:", response.data);
            
        } catch (error) {
            console.error("Login error:", error);
            
        }
    };








    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 min-h-screen flex items-center justify-center bg-opacity-20 bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
                <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="username"
                        type="text"
                        autoComplete="username"
                        onChange={handlechange}
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Email address or username"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={handlechange}
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                    </div>

                    <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot your password?
                    </a>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                    Sign in
                    </button>
                    <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"

                            onClick={onClose}
                            type="button"
                        >
                            Cancel
                        </button>
                </div>
                </form>
            </div>
        </div>
    );
}

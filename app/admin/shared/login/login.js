"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

const Login = ({searchParams, whichAdmin, session}) => {

    const [inputs, setInputs] = useState({ username: "", password: "" });
    const router = useRouter()

    if (session) {
        router.push('./')
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cbUrl = whichAdmin === 'super' ? `${process.env.NEXT_PUBLIC_BASE_URL}/admin/super` : `${process.env.NEXT_PUBLIC_BASE_URL}`
        await signIn("credentials", {
            username: inputs.username,
            password: inputs.password,
            callbackUrl: cbUrl
        });
    }

    return (
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-md font-bold leading-tight tracking-tight text-gray-900 ">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={inputs.username || ""}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="name@company.com"
                            required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label> 
                        <input id="password"
                            name="password"
                            type="password"
                            autoComplete="off"
                            required
                            value={inputs.password || ""}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                    {searchParams?.error && (
                        <p className="text-red-600 text-center capitalize">
                            Login failed.
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Login
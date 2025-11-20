import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";
import { LoadingSpinner } from "../components/LoadingSpinner";

import type { LoginFormData } from "../types/login";

export default function Login() {
    const { mutate: login, isPending, isError, error } = useLogin();

    const [clientError, setClientError] = useState<string>('');
    const [loginForm, setLoginForm] = useState<LoginFormData>({
        studentId: '',
        password: '',
    });

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClientError('');
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(loginForm);
    };

    if (isPending) {
        return <LoadingSpinner text="로그인 중..."/>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
                    로그인
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID
                        </label>
                        <input 
                            type="text"
                            id="studentId"
                            name="studentId"
                            onChange={handleChangeForm} 
                            value={loginForm.studentId}
                            required 
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 no-spinner"
                            placeholder="학번을 입력하세요"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            name="password"
                            onChange={handleChangeForm} 
                            value={loginForm.password}
                            required 
                            autoComplete="new-password"
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>

                    {(clientError || isError) && (
                        <div className="mt-4 text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                            {clientError || error?.message}
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        로그인
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    아직 계정이 없으신가요?{' '}
                    <Link to="/signup" className="text-green-600 hover:text-green-800 font-semibold hover:underline transition-colors">
                        회원가입
                    </Link>
                </p>
            </div>
        </div>
    );
}

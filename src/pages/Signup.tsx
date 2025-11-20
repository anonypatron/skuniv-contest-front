import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/auth/useSignup';
import { requestVerificationCode } from '../api/authApi';

import type { SignupForm } from '../types/signup';

export default function Signup() {
    const { mutate: signup, isPending, isError, error } = useSignup();

    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [clientError, setClientError] = useState<string>('');
    const [clientSuccess, setClientSuccess] = useState<string>('');
    const [signupForm, setSignupForm] = useState<SignupForm>({
        major: '',
        name: '',
        studentId: '',
        password: '',
        email: '',
        code: '',
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClientSuccess('');
        setClientError('');

        if (name === 'email') {
            setIsCodeSent(false);
        }

        setSignupForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signup(signupForm);
    };

    const handleSendVerificationCode = async () => {
        try {
            const res = await requestVerificationCode(signupForm.email);
            setIsCodeSent(true);
            setClientSuccess('인증번호가 이메일로 전송되었습니다.');
        } catch (err: any) {
            console.error('인증번호 전송 실패');
            setClientError('인증번호 전송 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
                    회원가입
                </h2>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                            Major
                        </label>
                        <input 
                            type="text" 
                            id="major" 
                            name="major" 
                            onChange={handleFormChange} 
                            value={signupForm.major}
                            required 
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            onChange={handleFormChange}
                            value={signupForm.name}
                            required 
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                            Student ID
                        </label>
                        <input 
                            type="text"
                            id="studentId" 
                            name="studentId" 
                            onChange={handleFormChange}
                            value={signupForm.studentId}
                            required 
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            비밀번호
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            onChange={handleFormChange} 
                            value={signupForm.password}
                            required 
                            autoComplete="new-password"
                            className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-mail
                        </label>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                onChange={handleFormChange}
                                value={signupForm.email}
                                required 
                                disabled={isCodeSent}
                                className="flex-grow px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                            />
                            <button 
                                type="button" 
                                onClick={handleSendVerificationCode} 
                                disabled={!signupForm.email || isCodeSent} // 이메일 없거나, 이미 인증되었거나, 이미 보냈으면 비활성화
                                className="shrink-0 bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                {isCodeSent ? '재전송' : '인증번호 보내기'}
                            </button>
                        </div>
                    </div>

                    {isCodeSent && (
                        <div>
                            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                                인증번호
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    id="verificationCode"
                                    name="code"
                                    onChange={handleFormChange}
                                    value={signupForm.code}
                                    required
                                    className="flex-grow px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all placeholder-gray-400"
                                    placeholder="전송된 인증번호를 입력하세요"
                                />
                            </div>
                        </div>
                    )}
                    
                    {clientSuccess && (
                        <div className="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-lg border border-green-200">
                            {clientSuccess}
                        </div>
                    )}
                    {(clientError || isError) && (
                        <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                            {clientError || error?.message}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isPending}
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? '가입 처리 중...' : '회원가입'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    이미 계정이 있으신가요?{' '}
                    <Link to="/" className="text-green-600 hover:text-green-800 font-semibold hover:underline transition-colors">
                        로그인
                    </Link>
                </p>
            </div>
        </div>
    );
}

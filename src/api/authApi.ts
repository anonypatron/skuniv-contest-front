import type { LoginFormData } from "../types/login";
import type { SignupForm } from "../types/signup";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface LoginResponse {
    accessToken: string;
    expiresInSeconds: number;
}

export const loginRequest = async (formData: LoginFormData): Promise<LoginResponse> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error('학번 또는 비밀번호가 일치하지 않습니다.');
        }
        
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || '로그인 중 문제가 발생했습니다.');
    }

    return await res.json();
};

export const signupRequest = async (formData: SignupForm) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error(res.status);
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }
};

// 인증 번호 요청
export const requestVerificationCode = async (email: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/send-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '인증번호를 보내는 데 실패했습니다.');
    }
};

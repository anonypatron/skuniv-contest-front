import { useMutation } from "@tanstack/react-query";
import { loginRequest } from '../../api/authApi';
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const router = useNavigate();

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.accessToken);
            router('/home');
        },
        onError: (err: any) => {
            console.error(err);
        },
    });
};

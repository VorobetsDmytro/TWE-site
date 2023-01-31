import { useCallback, useState } from "react";
import { useHttp } from "../../hooks/http.hooks";
import { RegisterUserDto } from "./dto/register-user.dto";
import { BACK_URL } from "../../main.variables";
import { LoginDto } from "./dto/login.dto";
import { logoutAction, setUserAction } from "../../store/user/user.actions";
import { ActivationDto } from "./dto/activation.dto";

export const useAuth = () => {
    const [ready, setReady] = useState(false);
    const { request } = useHttp();

    const registration = async (body: RegisterUserDto) => {
        try {
            const response = await request(`${BACK_URL}/auth/registration`, 'POST', body);
            if(response instanceof Error)
                throw response;
            if(response.message)
                alert(response.message);
            return response;
        } catch (error) {
            alert(error);
        }
    }

    const login = (body: LoginDto) => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/auth/login`, 'POST', body);
                if(response instanceof Error)
                    throw response;
                if(response.message)
                    alert(response.message);
                dispatch(setUserAction(response.user));
                localStorage.setItem('token', response.token);
                return response;
            } catch (error) {
                alert(error);
            }
        }
    }

    const logout = () => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/auth/logout`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                if(response.message)
                    console.log(response.message);
                dispatch(logoutAction());
                localStorage.removeItem('token');
                return response;
            } catch (error) {
                alert(error);
            }
        }
    }

    const activation = (body: ActivationDto, userId: string, link: string) => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/activation-link/activation/${userId}/${link}`, 'POST', body);
                if(response instanceof Error)
                    throw response;
                if(response.message)
                    alert(response.message);
                dispatch(setUserAction(response.user));
                localStorage.setItem('token', response.token);
                return response;
            } catch (error) {
                alert(error);
            }
        }
    };

    const auth = useCallback(() => {
        return async (dispatch: any) => {
            try {
                const response = await request(`${BACK_URL}/auth`, 'GET', null, {Authorization: `Bearer ${localStorage.getItem('token')}`});
                if(response instanceof Error)
                    throw response;
                dispatch(setUserAction(response.user));
                localStorage.setItem('token', response.token);
            } catch (error) {
                localStorage.removeItem('token');
            } finally {
                setReady(true);
            }
        }
    }, [request]);

    return {
        ready,
        registration,
        login,
        logout,
        auth,
        activation
    }
}
import { useHttp } from "../../hooks/http.hooks";
import { BACK_URL } from "../../main.variables";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

export const useResetPassword = () => {
    const { request } = useHttp();

    const forgotPassword = async (dto: ForgotPasswordDto) => {
        try {
            const response = await request(`${BACK_URL}/reset-password/forgot`, 'POST', dto);
            if(response instanceof Error)
                throw response;
            if(response.message)
                alert(response.message);
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    const resetPassword = async (dto: ResetPasswordDto, userId: string, token: string) => {
        try {
            const response = await request(`${BACK_URL}/reset-password/reset/${userId}/${token}`, 'POST', dto);
            if(response instanceof Error)
                throw response;
            if(response.message)
                alert(response.message);
            return true;
        } catch (error) {
            alert(error);
            return false;
        }
    }

    return {
        forgotPassword,
        resetPassword
    }
}
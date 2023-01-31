import { useState } from "react";
import { useResetPassword } from "../../actions/reset-password/reset-password.actions";
import { useTypedSelector } from "../../hooks/type-selector";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordTextRegion } from "./reset-password-page.text-region";

import style from './reset-password-page.style.module.scss'

export const ResetPasswordPage = () => {
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [password, setPassword] = useState<string>('');
    const resetPasswordText = resetPasswordTextRegion(globalRegion);
    const { userId, token } = useParams();
    const { resetPassword } = useResetPassword();
    const navigate = useNavigate();

    const onSubmit = async () => {
        if(!password) {
            alert(resetPasswordText.alertValidate);
            return;
        }
        if(!userId || !token) {
            alert(resetPasswordText.alertError);
            return;
        }
        const show = await resetPassword({password}, userId, token);
        if(!show)
            return;
        navigate('/login');
    };

    return(
        <div className={style.reset_password}>
            <div className={style.reset_password_container}>
                <div className={style.reset_password_body}>
                    <h1 className={style.reset_password_title}>{resetPasswordText.blockTitle}</h1>
                    <div className={style.reset_password_input_field}>
                        <input className={style.reset_password_input} value={password} onChange={e => setPassword(e.target.value)}  type="password" placeholder={resetPasswordText.password} />
                        <button className={style.reset_password_submit_btn} onClick={() => onSubmit()}>{resetPasswordText.submit}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
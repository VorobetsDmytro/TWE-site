import { useState } from "react";
import { forgotPasswordTextRegion } from "./forgot-password.text-region";
import { useResetPassword } from "../../actions/reset-password/reset-password.actions";
import { useTypedSelector } from "../../hooks/type-selector";
import { useNavigate } from "react-router-dom";

import style from './forgot-password.style.module.scss'

export const ForgotPasswordPage = () => {
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [email, setEmail] = useState<string>('');
    const forgotPasswordText = forgotPasswordTextRegion(globalRegion);
    const { forgotPassword } = useResetPassword();
    const navigate = useNavigate();

    const onSubmit = async () => {
        if(!email) {
            alert(forgotPasswordText.alert);
            return;
        }
        const show = await forgotPassword({email});
        if(!show)
            return;
        navigate('/main');
    };

    return(
        <div className={style.forgot_password}>
            <div className={style.forgot_password_container}>
                <div className={style.forgot_password_body}>
                    <h1 className={style.forgot_password_title}>{forgotPasswordText.blockTitle}</h1>
                    <div className={style.forgot_password_input_field}>
                        <input className={style.forgot_password_input} value={email} onChange={e => setEmail(e.target.value)}  type="text" placeholder="Email" />
                        <button className={style.forgot_password_submit_btn} onClick={() => onSubmit()}>{forgotPasswordText.submit}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
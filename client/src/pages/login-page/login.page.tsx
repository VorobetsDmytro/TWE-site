import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useAuth } from "../../actions/auth/auth.action";
import { LoginText, loginTextRegion } from "./login-page.text-region";
import { useTypedSelector } from "../../hooks/type-selector";
import { NavLink } from "react-router-dom";

import style from './login-page.style.module.scss';

export const LoginPage = () => {
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginText, setLoginText] = useState<LoginText>();
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const dispatch: any = useDispatch();

    const submitHandler = async () => {
        dispatch(login({email, password}));
    }

    useEffect(() => {
        setLoginText(loginTextRegion(globalRegion));
    }, [globalRegion]);

    return (
        <div className={style.login}>
            <div className={style.login_container}>
                <div className={style.login_body}>
                    <h1 className={style.login_title}>{loginText?.login}</h1>
                    <div className={style.login_input_field}>
                        <input className={style.login_input} value={email} onChange={e => setEmail(e.target.value)}  type="text" placeholder="Email" />
                        <input className={style.login_input} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={loginText?.password}/>
                        <NavLink to='/forgot-password'>
                            <span className={style.login_forogt_password_link}>{loginText?.forgotPassword}</span>
                        </NavLink>
                        <button className={style.login_submit_btn} onClick={()=>submitHandler()}>{loginText?.submit}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
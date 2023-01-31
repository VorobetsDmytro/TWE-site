import { useEffect, useState } from "react";
import { useAuth } from "../../actions/auth/auth.action";
import { useDispatch } from "react-redux";
import { RegistrationText, registrationTextRegion } from "./registration-page.text-region";
import { useTypedSelector } from "../../hooks/type-selector";

import style from './registration-page.style.module.scss'

export const RegistrationPage = () => {
    const {registration} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [registrationText, setRegistrationText] = useState<RegistrationText>();
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const dispatch: any = useDispatch();

    const submitHandler = async () => {
        if(password !== repeatPassword) {
            alert(registrationText?.uncorrectSubmit);
            return;
        }
        dispatch(registration({email, password, username}));
    }

    useEffect(() => {
        setRegistrationText(registrationTextRegion(globalRegion));
    }, [globalRegion]);

    return (
        <div className={style.registration}>
            <div className={style.registration_container}>
                <div className={style.registration_body}>
                    <h1 className={style.registration_title}>{registrationText?.register}</h1>
                    <div className={style.registration_input_field}>
                        <input className={style.registration_input} value={username} onChange={e => setUsername(e.target.value)}  type="text" placeholder={registrationText?.username} />
                        <input className={style.registration_input} value={email} onChange={e => setEmail(e.target.value)}  type="text" placeholder="Email" />
                        <input className={style.registration_input} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={registrationText?.password}/>
                        <input className={style.registration_input} value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} type="password" placeholder={registrationText?.repeatPassword}/>
                        <button className={style.registration_submit_btn} onClick={()=>submitHandler()}>{registrationText?.submit}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
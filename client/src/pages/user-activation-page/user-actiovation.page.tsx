import { useParams } from "react-router-dom";
import { useAuth } from "../../actions/auth/auth.action";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import style from './user-activation-page.style.module.scss'
import { useTypedSelector } from "../../hooks/type-selector";
import { UserActivationText, userActivationTextRegion } from "./user-activation-page.text-region";

export const UserActivationPage = () => {
    const {activation} = useAuth();
    const {userId, link} = useParams();
    const [password, setPassword] = useState('');
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [userActivationText, setUserActivationText] = useState<UserActivationText>();
    const dispatch: any = useDispatch();

    const submitHandler = async () => {
        if(!userId || !link)
            return;
        dispatch(activation({password}, userId, link));  
    }

    useEffect(() => {
        setUserActivationText(userActivationTextRegion(globalRegion));
    }, [globalRegion]);

    return (
        <div className={style.user_activation}>
            <div className={style.user_activation_container}>
                <div className={style.user_activation_body}>
                    <h1 className={style.user_activation_title}>{userActivationText?.userActivation}</h1>
                    <div className={style.user_activation_input_field}>
                        <input className={style.user_activation_input} value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={userActivationText?.password}/>
                        <button className={style.user_activation_submit_btn} onClick={()=>submitHandler()}>{userActivationText?.submit}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
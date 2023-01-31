import { NavLink, useLocation } from "react-router-dom"
import { FC, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/type-selector";
import { useDispatch } from "react-redux";
import { useAuth } from "../../actions/auth/auth.action";
import { RegionSelectorComponent } from "../region-selector/region-selector.component";
import { NavbarText, navbarTextRegion } from "./navbar.text-region";

import styles from './navbar.style.module.scss';

interface INavbarComponent {
    ready: boolean;
}

export const NavbarComponent: FC<INavbarComponent> = ({ready}) => {
    const location = useLocation();
    const { logout } = useAuth();
    const { isAuth } = useTypedSelector(state => state.userReducer);
    const { globalRegion } = useTypedSelector(state => state.globalRegionReducer);
    const [navbarText, setNavbarText] = useState<NavbarText>();
    const dispatch: any = useDispatch();

    const handleLogoutClick = () => {
        dispatch(logout());
    };

    useEffect(() => {
        setNavbarText(navbarTextRegion(globalRegion));
    }, [globalRegion]);

    return(
        <div className={styles.navbar}>
            <span className={styles.navbar_title}>TWE</span>
            { ready 
                ?<div className={styles.navbar_items}>
                    <a><RegionSelectorComponent globalRegionName={globalRegion}/></a>
                    <NavLink className={location.pathname === '/main' ? styles.navbar_current : ''} to={'/main'}>{navbarText?.main}</NavLink>
                    <NavLink className={location.pathname === '/news' ? styles.navbar_current : ''} to={'/news'}>{navbarText?.news}</NavLink>
                    {!isAuth && <NavLink className={styles.navbar_button} to={'/login'}>{navbarText?.login}</NavLink>}
                    {!isAuth && <NavLink className={styles.navbar_button} to={'/registration'}>{navbarText?.registration}</NavLink>}
                    {isAuth && <NavLink className={styles.navbar_button_red} onClick={handleLogoutClick} to={''}>{navbarText?.logout}</NavLink>}
                </div>
                : <div></div>
            }
        </div>
    )
}
import {Routes, Route, Navigate} from 'react-router-dom';
import { MainPage } from './pages/main-page/main.page';
import { NewsPage } from './pages/news-page/news.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { useAuth } from './actions/auth/auth.action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useTypedSelector } from './hooks/type-selector';
import { LoginPage } from './pages/login-page/login.page';
import { RegistrationPage } from './pages/registration-page/registration.page';
import { UserActivationPage } from './pages/user-activation-page/user-actiovation.page';
import { useGlobalRegion } from './actions/global-region/global-region.actions';
import { NewsCardPage } from './pages/news-card-page/news-card.page';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordPage } from './pages/forgot-password-page/forgot-password.page.component';
import { ResetPasswordPage } from './pages/reset-password-page/reset-password-page.page';

import styles from './App.style.module.scss';

function App() {
  const { isAuth } = useTypedSelector(state => state.userReducer);
  const dispatch: any = useDispatch();
  const { auth, ready } = useAuth();
  const { getCurrentGlobalRegion } = useGlobalRegion();

  useEffect(() => {
    dispatch(auth());
    dispatch(getCurrentGlobalRegion());
  },[dispatch, auth, getCurrentGlobalRegion]);
  
  return (
    <div className={styles.app}>
       <div className={styles.app_container}>
       <NavbarComponent ready={ready}/>
        <Routes>
             <Route path={'/main'} element={<MainPage/>}/>
             <Route path={'/news'} element={<NewsPage/>}/>
             <Route path={'/news/:newsCardId'} element={<NewsCardPage/>}/>
             <Route path={'/forgot-password'} element={<ForgotPasswordPage />}/>
             <Route path={'/reset-password/:userId/:token'} element={<ResetPasswordPage />}/>
             {!isAuth && <Route path={'/login'} element={<LoginPage/>}/>}
             {!isAuth && <Route path={'/registration'} element={<RegistrationPage/>}/>}
             {!isAuth && <Route path={'/registration/accept/:userId/:link'} element={<UserActivationPage/>}/>}
             <Route
			   	    path="*"
			   	    element={<Navigate to="/main" replace />}
			       />
        </Routes>
        <FooterComponent />
       </div>
    </div>
  );
}

export default App;

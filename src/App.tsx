import { Sidebar } from '@/components/Sidebar';
import { Routes } from '@/router';

import { useLocation } from 'react-router-dom';
import Async from 'react-async';

import { CookiesProvider } from 'react-cookie';
import { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { authService } from './services/auth.service';
import store from './store';
import { errorHandler } from './api/errorHandler';
import { setIsAuth } from './store/authSlice';
import { setLoading } from './store/loadingSlice';
import { Preloader } from './components/Preloader';
import { UserService } from './services/user.service';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';

import { AlertMessage } from '@/components/AlertMessage/AlertMessage';

const checkAuth = async () => {
  return await authService
    .auth()
    .then(async (response) => {
      const { isAuth } = response;
      await store.dispatch(setIsAuth(isAuth));
      await store.dispatch(setLoading(false));
      return isAuth;
    })
    .catch((error) => {
      errorHandler(error);
    });
};

function App() {
  const dispatch = useDispatch();

  const [hideSidebar, setHideSidebar] = useState(false);
  const { pathname } = useLocation();
  const { isAuthorization, isLoading, isShowNotification } = useSelector(
    (state) => {
      return {
        isAuthorization: state.auth.isAuth,
        isLoading: state.loading.isLoading,
        isShowNotification: state.alert.isShow,
      };
    },
  );

  const getUser = useCallback(async () => {
    const user = await UserService.getUser();
    await dispatch(setUser(user));
  }, []);

  useEffect(() => {
    if (pathname === '/login' || pathname === '/registration') {
      setHideSidebar(true);
      return;
    }

    setHideSidebar(false);
  }, [pathname]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const Bar = ({ isShow }: { isShow: boolean }) => {
    if (isShow) {
      return <Sidebar />;
    }
    return '';
  };

  const Loader = ({ isShow }: { isShow: boolean }) => {
    if (isShow) return <Preloader />;
  };

  const Alert = ({ isShow = false }: { isShow: boolean }) => {
    if (isShow) {
      return <AlertMessage isShow={isShowNotification} />;
    }
  };

  return (
    <>
      <Async promiseFn={checkAuth}>
        {({ data: isAuth }) => (
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <Loader isShow={isLoading} />
            <Alert isShow={isShowNotification} />
            <div className={'flex'}>
              <Bar isShow={isAuthorization && !hideSidebar} />
              <Routes isAuthorization={isAuth} />
            </div>
          </CookiesProvider>
        )}
      </Async>
    </>
  );
}

export default App;

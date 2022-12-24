/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useAppContext } from './utils';
import { DefaultLayout } from './Layouts';
import { actions } from './app/';
import {
    privateRouter,
    publicRouter,
    userRouter,
} from './routers/routerRender';
import routers from './routers/routers';
import { Icons } from './components';

function App() {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state.set;
    // const { del, cre, upd, error, success } = state.set.message;
    const [scrollToTop, setScrollToTop] = React.useState(false);
    const [getApp, setGetApp] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const Routers =
        currentUser?.rule === 'admin' || currentUser?.rule === 'manager'
            ? privateRouter
            : currentUser?.rule === 'user'
            ? userRouter
            : publicRouter;
    const history = useNavigate();
    const toogleGetApp = (e) => {
        e.stopPropagation();
        setGetApp(!getApp);
    };
    const getAppTrue = (e) => {
        e.stopPropagation();
        setGetApp(true);
    };
    useEffect(() => {
        const handleScrollToTop = () => {
            const heightY = window.scrollY;
            if (heightY > 100) {
                setScrollToTop(true);
            } else {
                setScrollToTop(false);
            }
        };
        window.addEventListener('scroll', handleScrollToTop);
        if (currentUser && currentUser?.rule) {
            dispatch(
                actions.setData({
                    ...state.set,
                    currentUser: currentUser,
                })
            );
        } else {
            if (
                !currentUser &&
                !!publicRouter.includes(window.location.pathname)
            ) {
                history(routers.login);
            } else {
                publicRouter.includes(window.location.pathname);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const downloadFile = async (url, name) => {
        setIsLoading(true);
        const response = await fetch(url);
        const blob = await response.blob();
        const urlDownload = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urlDownload;
        a.download = name;
        a.click();
        setGetApp(false);
        setIsLoading(false);
    };
    return (
        <>
            <div className='app'>
                <Routes>
                    {Routers.map((route, index) => {
                        const Layout = route.layout
                            ? route.layout
                            : route.layout === null
                            ? Fragment
                            : DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                {scrollToTop && (
                    <div
                        className='scroll-to-top-container'
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <i className='fa-solid fa-arrow-up'></i>
                    </div>
                )}
            </div>
            <div
                className='noSupport'
                style={{
                    backgroundImage: 'url(/images/bg-login.png)',
                }}
            >
                <Alert
                    severity='info'
                    style={{ minWidth: '80%', fontSize: '16px' }}
                >
                    Website only support on PC!
                </Alert>
            </div>
            <div
                className='btn-down-app'
                onClick={toogleGetApp}
                style={{ right: scrollToTop ? '70px' : '20px' }}
            >
                <span>Get App Mobile</span>
                {getApp && (
                    <div className='list-app-container' onClick={getAppTrue}>
                        <div
                            onClick={() => {
                                downloadFile(
                                    require('./APK Android/app-release.apk'),
                                    'transactions'
                                );
                            }}
                            className='list-app-item'
                        >
                            <Icons.AndroidIcon />
                            <div className='list-app-item-text ml8'>
                                {isLoading
                                    ? 'Downloading android app...'
                                    : 'Download for Android (.apk)'}
                            </div>
                        </div>
                        <div className='list-app-item'>
                            <Icons.AppleStoreIcon />
                            <div className='list-app-item-text ml8'>
                                Download for iOS
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;

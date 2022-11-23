/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { alertUtils, useAppContext } from './utils';
import { DefaultLayout } from './Layouts';
import { actions } from './app/';
import routers from './routers/routers';
import { privateRouter, publicRouter } from './routers/routerRender';

function App() {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state.set;
    const { del, cre, upd, error, success } = state.set.message;
    const [scrollToTop, setScrollToTop] = React.useState(false);
    const Routers = currentUser ? privateRouter : publicRouter;
    const history = useNavigate();
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    if (error || del || cre || upd || success) {
        setTimeout(() => {
            handleCloseAlert();
        }, 5000);
    }
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
        if (currentUser) {
            dispatch(
                actions.setData({
                    ...state.set,
                    currentUser: currentUser,
                })
            );
        } else {
            history(`${routers.login}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
        </>
    );
}

export default App;

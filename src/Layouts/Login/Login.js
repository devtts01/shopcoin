import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { useAppContext, axiosUtils, localStoreUtils } from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import styles from './Login.module.css';

const cx = className.bind(styles);

function Login() {
    const { state, dispatch } = useAppContext();
    const { email, password } = state.set.form;
    const [isProcess, setIsProcess] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        document.title = `Login | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsProcess(true);
            const res = await axiosUtils.authPost('login', {
                email,
                password,
            });
            switch (res.code) {
                case 0:
                    await localStoreUtils.setStore({
                        username: res.data.user.payment.username,
                        email: res.data.user.payment.email,
                        rule: res.data.user.payment.rule,
                        createdAt: res.data.createAt,
                        token: res.data.token,
                        id: res.data.user._id,
                    });
                    dispatch(
                        actions.setData({
                            ...state.set,
                            currentUser: localStoreUtils.getStore(),
                            form: {
                                username: '',
                                email: '',
                                password: '',
                            },
                            message: {
                                error: '',
                            },
                        })
                    );
                    history(
                        res.data.user.payment.rule === 'user'
                            ? routers.homeUser
                            : routers.dashboard
                    );
                    break;
                case 1:
                case 2:
                    dispatch(
                        actions.setData({
                            ...state.set,
                            message: {
                                ...state.set.message,
                                error: res?.message,
                            },
                        })
                    );
                    break;
                default:
                    break;
            }
            setIsProcess(false);
        } catch (error) {
            dispatch(
                actions.setData({
                    ...state.set,
                    message: {
                        ...state.set.message,
                        error: error?.response?.data?.message,
                    },
                })
            );
        }
    };
    const onEnter = (e) => {
        handleLogin(e);
    };
    return (
        <Form
            titleForm='Log in your account'
            textBtn='Log in'
            onClick={handleLogin}
            bolEmail
            bolPassword
            loginForm
            className={cx('form-page-login')}
            isProcess={isProcess}
            onEnter={onEnter}
        >
            <Link
                to={routers.forgotPwd}
                className={`${cx('login-forgotpwd-link')}`}
            >
                Forgot your password?
            </Link>
        </Form>
    );
}

export default Login;

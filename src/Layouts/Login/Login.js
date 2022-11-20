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
        document.title = 'Login | Shop Coin Transactions';
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
                        username: res.userInfo.payment.username,
                        email: res.userInfo.payment.email,
                        createdAt: res.createAt,
                        token: res.token,
                        id: res.userInfo._id,
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
                    history('/');
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

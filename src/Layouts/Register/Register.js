import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAppContext, axiosUtils } from '../../utils';
import { Form } from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import styles from './Register.module.css';

const cx = className.bind(styles);

function Register() {
    const { state, dispatch } = useAppContext();
    const { email, password, username } = state.set.form;
    const [isProcess, setIsProcess] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        document.title = `Register | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setIsProcess(true);
            const res = await axiosUtils.authPost('register', {
                username,
                email,
                password,
            });
            switch (res.code) {
                case 0:
                    dispatch(
                        actions.setData({
                            ...state.set,
                            form: {
                                username: '',
                                email: '',
                                password: '',
                            },
                            message: {
                                ...state.set.message,
                                error: '',
                            },
                        })
                    );
                    history(`${routers.login}`);
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
        handleRegister(e);
    };

    return (
        <Form
            titleForm='Register account'
            textBtn='Register'
            onClick={handleRegister}
            bolUsername
            bolEmail
            bolPassword
            registerForm
            className={cx('form-page-login')}
            isProcess={isProcess}
            onEnter={onEnter}
        />
    );
}

export default Register;

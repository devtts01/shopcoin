/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import styles from './ForgotPwd.module.css';
import { useAppContext } from '../../utils';
import routers from '../../routers/routers';

const cx = className.bind(styles);

function ForgotPwd() {
    const { state } = useAppContext();
    const { email } = state.set.form;
    const [isProcess, setIsProcess] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        document.title = `Forgot Password | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            await 1;
            setIsProcess(true);
            console.log(email);
            history(routers.resetPwdUser);
            setIsProcess(false);
        } catch (error) {
            console.log(error);
        }
    };
    const onEnter = (e) => {
        handleForgot(e);
    };

    return (
        <Form
            titleForm='Forgot Password'
            textBtn='Send email'
            onClick={handleForgot}
            bolEmail
            forgotPwdForm
            className={cx('form-page-login')}
            onEnter={onEnter}
            isProcess={isProcess}
        />
    );
}

export default ForgotPwd;

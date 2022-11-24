import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Form } from '../../components';
import styles from './ForgotPwd.module.css';

const cx = className.bind(styles);

function ForgotPwd() {
    useEffect(() => {
        document.title = `Forgot Password | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            console.log('ForgotPwd');
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
        />
    );
}

export default ForgotPwd;

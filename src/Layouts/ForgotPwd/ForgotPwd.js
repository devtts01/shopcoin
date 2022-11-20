import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Form } from '../../components';
import styles from './ForgotPwd.module.css';

const cx = className.bind(styles);

function ForgotPwd() {
    useEffect(() => {
        document.title = 'Forgot Password | Shop Coin Transactions';
    }, []);
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            console.log('ForgotPwd');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form
            titleForm='Forgot Password'
            textBtn='Send email'
            onClick={handleForgot}
            bolEmail
            forgotPwdForm
            className={cx('form-page-login')}
        />
    );
}

export default ForgotPwd;

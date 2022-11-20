import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import Alert from '@mui/material/Alert';
import { Image, FormInput, Button } from '../../components';
import { useAppContext, formUtils, alertUtils } from '../../utils';
import { actions } from '../../app/';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';

const cx = className.bind(styles);

function Form({
    titleForm,
    textBtn,
    onClick,
    disabled,
    bolUsername,
    bolEmail,
    bolPassword,
    loginForm,
    registerForm,
    forgotPwdForm,
    isProcess,
    className,
    children,
}) {
    const { state, dispatch } = useAppContext();
    const { email, password, username } = state.set.form;
    const { error } = state.set.message;
    const classed = cx('form-container', className);
    const handleChange = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    return (
        <div
            className={classed}
            style={{
                backgroundImage: 'url(/images/bg-login.png)',
            }}
        >
            <div className={`${cx('form-container-main')}`}>
                <div className={`${cx('form-login')}`}>
                    <Image
                        src='/images/header-logo.png'
                        alt='login-logo'
                        className={`${cx('form-logo')}`}
                    />
                    <p className={`${cx('form-title')}`}>{titleForm}</p>
                    {error && (
                        <Alert
                            severity='error'
                            style={{ width: '100%' }}
                            onClose={handleCloseAlert}
                        >
                            {error}
                        </Alert>
                    )}
                    {bolUsername && (
                        <FormInput
                            label='Username'
                            type='username'
                            placeholder='Enter your username'
                            classNameField={`${cx('custom-field')}`}
                            value={username}
                            name='username'
                            onChange={handleChange}
                        />
                    )}
                    {bolEmail && (
                        <FormInput
                            label='Email'
                            type='email'
                            placeholder='Enter your email'
                            classNameField={`${cx('custom-field')}`}
                            value={email}
                            name='email'
                            onChange={handleChange}
                        />
                    )}
                    {bolPassword && (
                        <FormInput
                            label='Password'
                            type='password'
                            placeholder='Enter your password'
                            classNameField={`${cx('custom-field')}`}
                            value={password}
                            name='password'
                            onChange={handleChange}
                            showPwd
                        />
                    )}
                    {children}
                    <Button
                        isProcess={isProcess}
                        disabled={disabled}
                        className={`${cx('form-btn')}`}
                        onClick={onClick}
                    >
                        {textBtn}
                    </Button>
                    {(loginForm || registerForm) && (
                        <div className={`${cx('form-help')}`}>
                            <span>
                                {loginForm
                                    ? "Don't have an account?"
                                    : 'Have an account?'}{' '}
                            </span>
                            <Link
                                className={`${cx('form-link')}`}
                                to={
                                    loginForm
                                        ? `${routers.register}`
                                        : `${routers.login}`
                                }
                            >
                                {loginForm ? 'Register' : 'Login'}
                            </Link>
                        </div>
                    )}
                    {forgotPwdForm && (
                        <>
                            <div className={`${cx('form-help')}`}>
                                <span>Have an account? </span>
                                <Link
                                    className={`${cx('form-link')}`}
                                    to={`${routers.login}`}
                                >
                                    Login
                                </Link>
                            </div>
                            <div className={`${cx('form-help')}`}>
                                <span>Don't have an account? </span>
                                <Link
                                    className={`${cx('form-link')}`}
                                    to={`${routers.register}`}
                                >
                                    Register
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

Form.propTypes = {
    titleForm: PropTypes.string,
    textBtn: PropTypes.string,
    onClick: PropTypes.func,
    bolUsername: PropTypes.bool,
    bolEmail: PropTypes.bool,
    bolPassword: PropTypes.bool,
    loginForm: PropTypes.bool,
    registerForm: PropTypes.bool,
    forgotPwdForm: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Form;

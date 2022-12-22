import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import { Form } from '../../components';
import styles from './ResetPwd.module.css';
import { axiosUtils, useAppContext } from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';

const cx = className.bind(styles);

export default function ResetPwd() {
    const { state, dispatch } = useAppContext();
    const { otpCode, password } = state.set.form;
    const { tokenResetPwd } = state.set;
    const [isProcess, setIsProcess] = useState(false);
    const history = useNavigate();
    useEffect(() => {
        document.title = `Reset Password | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const handleReset = async (e) => {
        try {
            await 1;
            setIsProcess(true);
            const resPut = await axiosUtils.userPut(
                `/getOTP/${tokenResetPwd}`,
                {
                    otp: otpCode,
                    pwd: password,
                }
            );
            switch (resPut.code) {
                case 0:
                    dispatch(
                        actions.setData({
                            ...state.set,
                            tokenResetPwd: resPut?.data,
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
                    history(routers.login);
                    break;
                case 1:
                case 2:
                    dispatch(
                        actions.setData({
                            ...state.set,
                            message: {
                                ...state.set.message,
                                error: resPut?.message,
                            },
                        })
                    );
                    break;
                default:
                    break;
            }
            setIsProcess(false);
        } catch (err) {
            console.log(err);
        }
    };
    const onEnter = (e) => {
        handleReset(e);
    };
    return (
        <Form
            titleForm='Reset Password'
            textBtn='Submit'
            onClick={handleReset}
            bolPassword
            bolOtpCode
            resetPwdForm
            className={cx('form-page-login')}
            isProcess={isProcess}
            onEnter={onEnter}
        ></Form>
    );
}

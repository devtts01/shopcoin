/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import routers from '../../routers/routers';
import { Image } from '../../components';
import styles from './PageNotFound.module.css';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);

function PageNotFound() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const history = useNavigate();
    useEffect(() => {
        if (!currentUser || !currentUser?.rule) {
            history(routers.login);
        }
    }, []);
    return (
        <div className={`${cx('page-not-found-container')}`}>
            {!currentUser || !currentUser?.rule ? (
                <div className='fz16 fwb'>
                    The login session has expired or the path is invalid. Please
                    login again. Thanks
                </div>
            ) : (
                <Image
                    src='/svgs/404.svg'
                    alt='pageNotFoundImage'
                    className={`${cx('page-not-found-image')}`}
                />
            )}
            <p className={`${cx('backToHome')}`}>
                Back to{' '}
                <Link
                    to={
                        !currentUser || !currentUser?.rule
                            ? routers.login
                            : currentUser?.rule === 'user'
                            ? routers.homeUser
                            : routers.dashboard
                    }
                >
                    {!currentUser || !currentUser?.rule
                        ? 'Login Page'
                        : 'Home Page'}
                </Link>
            </p>
        </div>
    );
}

export default PageNotFound;

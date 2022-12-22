import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';
import { Image } from '../../components';
import styles from './PageNotFound.module.css';
import { useAppContext } from '../../utils';

const cx = className.bind(styles);

function PageNotFound() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    return (
        <div className={`${cx('page-not-found-container')}`}>
            <Image
                src='/svgs/404.svg'
                alt='pageNotFoundImage'
                className={`${cx('page-not-found-image')}`}
            />
            <p className={`${cx('backToHome')}`}>
                Back to{' '}
                <Link
                    to={
                        !currentUser
                            ? routers.login
                            : currentUser?.rule === 'user'
                            ? routers.homeUser
                            : routers.dashboard
                    }
                >
                    {!currentUser ? 'Login Page' : 'Home Page'}
                </Link>
            </p>
        </div>
    );
}

export default PageNotFound;

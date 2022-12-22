import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './ContactUser.module.css';

const cx = className.bind(styles);

export default function ContactUser() {
    useEffect(() => {
        document.title = `Contact | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    return (
        <>
            <div className={`${cx('desc')}`}>
                If you have any questions about trading with Transactions
                Company, do not hesitate to contact our support team by:{' '}
                <a href='mailto:sptransaction@gmail.com' className='confirm'>
                    sptransaction@gmail.com
                </a>
            </div>
        </>
    );
}

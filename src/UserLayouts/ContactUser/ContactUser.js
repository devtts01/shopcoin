import React from 'react';
import className from 'classnames/bind';
import styles from './ContactUser.module.css';

const cx = className.bind(styles);

export default function ContactUser() {
    return (
        <>
            <div className={`${cx('desc')}`}>
                If you have any questions about trading with ShopCoinUSA, do not
                hesitate to contact our support team by:{' '}
                <a href='mailto:spshopcoinusa@gmail.com' className='confirm'>
                    spshopcoinusa@gmail.com
                </a>
            </div>
        </>
    );
}

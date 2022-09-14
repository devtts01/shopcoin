import React from 'react';
import className from 'classnames/bind';
import styles from './Loading.module.css';

const cx = className.bind(styles);

function Loading() {
    return (
        <div className={`${cx('loading-container')}`}>
            <span className={`${cx('loader')}`}></span>
        </div>
    );
}

export default Loading;

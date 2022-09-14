import React from 'react';
import className from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Home.module.css';

const cx = className.bind(styles);

function Home() {
    return (
        <div className={`${cx('home-container')}`}>
            <Skeleton height={100} style={{ marginBottom: '10px' }} />
            <Skeleton height={200} />
        </div>
    );
}

export default Home;

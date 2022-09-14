import React, { useEffect } from 'react';
import className from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Dashboard.module.css';

const cx = className.bind(styles);

function Dashboard() {
    const data = [1, 2, 3, 4];
    useEffect(() => {
        document.title = 'Dashboard | Shop Coin';
    }, []);
    return (
        <div className={`${cx('dashboard-container')}`}>
            {data.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <Skeleton height={200} />
                </div>
            ))}
        </div>
    );
}

export default Dashboard;

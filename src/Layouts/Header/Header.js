/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import routers from '../../routers/routers';
import { useAppContext, axiosUtils, numberUtils } from '../../utils';
import { Image, Icons, AccountMenu, TippyHLNotify } from '../../components';
import styles from './Header.module.css';

const cx = className.bind(styles);

function Header() {
    const { state } = useAppContext();
    const { currentUser } = state.set;
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const process = await axiosUtils.adminGet(
            `/getUser/${currentUser?.id}`
        );
        setUser(process.data);
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className={`${cx('header-container')}`}>
            <Link
                to={
                    currentUser?.rule === 'user'
                        ? routers.homeUser
                        : routers.home
                }
            >
                <Image
                    src='/images/header-logo01.png'
                    alt='header_logo'
                    className={`${cx('header-logo')}`}
                />
            </Link>
            <div className={`${cx('header-infouser-container')}`}>
                <div className={`${cx('text-wallet')}`}>
                    Your Wallet:{' '}
                    <span className='complete'>
                        {numberUtils.coinUSD(user?.Wallet?.balance || 0)}
                    </span>
                </div>
                <TippyHLNotify>
                    <Badge badgeContent={10}>
                        <Icons.BellIcon className={`${cx('iconsBell')}`} />
                    </Badge>
                </TippyHLNotify>
                <AccountMenu className={cx('ml10')} />
            </div>
        </div>
    );
}

export default Header;

import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import routers from '../../routers/routers';
import { Image, Icons, AccountMenu, TippyHLNotify } from '../../components';
import styles from './Header.module.css';

const cx = className.bind(styles);

function Header() {
    return (
        <div className={`${cx('header-container')}`}>
            <Link to={routers.home}>
                <Image
                    src='/images/header-logo.png'
                    alt='header_logo'
                    className={`${cx('header-logo')}`}
                />
            </Link>
            <div className={`${cx('header-infouser-container')}`}>
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

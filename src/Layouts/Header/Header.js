/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import routers from '../../routers/routers';
import { useAppContext } from '../../utils';
import { Image, Icons, AccountMenu, TippyHLNotify } from '../../components';
import styles from './Header.module.css';
import { actions } from '../../app/';

const cx = className.bind(styles);

function Header() {
    const { state, dispatch } = useAppContext();
    const { currentUser, isMenuList } = state.set;
    const toogleIsMenuList = () => {
        dispatch(actions.setData({ isMenuList: !isMenuList }));
    };
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
                    src='/images/header-logo.png'
                    alt='header_logo'
                    className={`${cx('header-logo')}`}
                />
            </Link>
            <div className={`${cx('header-infouser-container')}`}>
                <div
                    className='mr15 menu-icon cr-pointer'
                    onClick={toogleIsMenuList}
                >
                    <Icons.ListMenuIcons />
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

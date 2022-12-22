import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import routers from '../../routers/routers';
import { Icons } from '../../components';
import styles from './Sidebar.module.css';

const cx = className.bind(styles);
const LIST_SIDEBAR = [
    {
        name: 'Dashboard',
        path: routers.dashboard,
        icon: <Icons.DashboardIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Deposits',
        path: routers.deposits,
        icon: <Icons.DepositsIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Withdraws',
        path: routers.withdraw,
        icon: <Icons.WithdrawIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'User',
        path: routers.user,
        icon: <Icons.UserIcon className={`${cx('custom-icon')}`} />,
    },
];
const LIST_SIDEBAR_USER = [
    {
        name: 'Home Page',
        path: routers.homeUser,
        icon: <Icons.HomePageIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Buy History',
        path: routers.buyHistoryUser,
        icon: <Icons.HistoryIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Sell History',
        path: routers.sellHistoryUser,
        icon: <Icons.HistoryIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Profile',
        path: routers.profileUser,
        icon: <Icons.ProfileIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Contact',
        path: routers.contactUser,
        icon: <Icons.ContactIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Live Chat',
        path: routers.liveChatUser,
        icon: <Icons.LiveChatIcon className={`${cx('custom-icon')}`} />,
    },
];

function Sidebar({ className }) {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state.set;
    const classed = cx('sidebar-container', className);
    const handleBlacklistUser = () => {
        dispatch(
            actions.setData({
                ...state.set,
                datas: {
                    ...state.set.datas,
                    dataBlacklistUser: [],
                },
                pagination: {
                    page: 1,
                    show: 10,
                },
            })
        );
    };
    return (
        <div className={classed}>
            {(currentUser?.rule === 'user'
                ? LIST_SIDEBAR_USER
                : LIST_SIDEBAR
            ).map((item, index) => (
                <NavLink
                    onClick={handleBlacklistUser}
                    to={item.path}
                    className={(nav) =>
                        cx('menu-item', {
                            active: nav.isActive,
                        })
                    }
                    key={index}
                >
                    {item.icon}
                    <span className={cx('title')}>{item.name}</span>
                </NavLink>
            ))}
        </div>
    );
}
Sidebar.propTypes = {
    className: PropTypes.string,
};
export default Sidebar;

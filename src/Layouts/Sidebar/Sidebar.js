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
        name: 'Payment',
        path: routers.payment,
        icon: <Icons.PaymentIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Settings Coin',
        path: routers.settingCoin,
        icon: <Icons.SettingIcon className={`${cx('custom-icon')}`} />,
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
        name: 'Buy',
        path: routers.buy,
        icon: <Icons.BuyIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'Sell',
        path: routers.sell,
        icon: <Icons.SellIcon className={`${cx('custom-icon')}`} />,
    },
    {
        name: 'User',
        path: routers.user,
        icon: <Icons.UserIcon className={`${cx('custom-icon')}`} />,
    },
];

function Sidebar({ className }) {
    const { state, dispatch } = useAppContext();
    const classed = cx('sidebar-container', className);
    const handleBlacklistUser = () => {
        dispatch(
            actions.setData({
                ...state.set,
                datas: {
                    ...state.set.datas,
                    dataBlacklistUser: [],
                },
            })
        );
    };
    return (
        <div className={classed}>
            {LIST_SIDEBAR.map((item, index) => (
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

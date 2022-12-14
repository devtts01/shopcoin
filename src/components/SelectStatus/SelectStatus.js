/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useAppContext, textUtils, localStoreUtils } from '../../utils';
import { actions } from '../../app/';
import { Icons } from '..';
import styles from './SelectStatus.module.css';

const cx = className.bind(styles);

function SelectStatus({ status, rank, ruleUser, typePayment }) {
    const { state, dispatch } = useAppContext();
    const { statusUpdate, statusCurrent } = state.set;
    const { selectStatus } = state.toggle;
    useEffect(() => {
        dispatch(
            actions.setData({
                ...state.set,
                currentUser: localStoreUtils.getStore(),
            })
        );
    }, []);
    const setStatus = (status) => {
        dispatch(
            actions.setData({
                ...state.set,
                statusUpdate: textUtils.FirstUpc(status),
            })
        );
    };
    const toggleOption = (e) => {
        e.stopPropagation();
        dispatch(
            actions.setData({
                ...state.set,
                statusUpdate:
                    textUtils.FirstUpc(statusUpdate) ||
                    textUtils.FirstUpc(statusCurrent),
            })
        );
        dispatch(
            actions.toggleModal({
                ...state.toggle,
                selectStatus: !selectStatus,
            })
        );
    };
    const toggleOptionTrue = (e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                ...state.toggle,
                selectStatus: !selectStatus,
            })
        );
    };
    const classStatus =
        (statusUpdate || statusCurrent) &&
        (statusUpdate || statusCurrent)?.toLowerCase();
    const STATUS_LIST = [
        { name: 'Confirmed' },
        { name: 'Completed' },
        { name: 'Canceled' },
        { name: 'On hold' },
        { name: 'Pending' },
    ];
    const RANK_LIST = [
        { name: 'Vip' },
        { name: 'Pro' },
        { name: 'Standard' },
        { name: 'Demo' },
    ];
    const TYPE_PAYMENT_LIST = [
        { name: 'User' },
        { name: 'Admin' },
        { name: 'Manager' },
    ];
    const LIST = rank
        ? RANK_LIST
        : typePayment || ruleUser
        ? TYPE_PAYMENT_LIST
        : STATUS_LIST;
    return (
        <>
            <div
                className={`${cx('selectStatus-container')}`}
                onClick={toggleOption}
            >
                <div
                    className={`${cx(
                        'selectStatus-value',
                        classStatus?.replace(' ', '') + 'bgc'
                    )}`}
                >
                    {textUtils.FirstUpc(statusUpdate || statusCurrent)}
                </div>
                <Icons.SelectOptionArrowIcon />
                {selectStatus && (
                    <div
                        className={`${cx('status-container')}`}
                        onClick={toggleOptionTrue}
                    >
                        {LIST.map((item, index) => {
                            const classItem = item.name
                                ?.toLowerCase()
                                ?.replace(' ', '');
                            return (
                                <div
                                    key={index}
                                    className={`${
                                        classItem + 'bgc'
                                    } status border0`}
                                    onClick={() => setStatus(item.name)}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default SelectStatus;

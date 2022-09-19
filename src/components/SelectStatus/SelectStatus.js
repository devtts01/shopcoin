import React from 'react';
import className from 'classnames/bind';
import { useAppContext, textUtils } from '../../utils';
import { actions } from '../../app/';
import { Icons } from '..';
import styles from './SelectStatus.module.css';

const cx = className.bind(styles);

function SelectStatus({ status, rank }) {
    const { state, dispatch } = useAppContext();
    const { statusUpdate, statusCurrent } = state.set;
    const { selectStatus } = state.toggle;
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
        (statusUpdate || statusCurrent).toLowerCase().replace(' ', '');
    const STATUS_LIST = [
        { name: 'Confirm' },
        { name: 'Complete' },
        { name: 'Cancel' },
        { name: 'On hold' },
    ];
    const RANK_LIST = [
        { name: 'Vip' },
        { name: 'Pro' },
        { name: 'Standard' },
        { name: 'Demo' },
    ];
    const LIST = rank ? RANK_LIST : STATUS_LIST;
    return (
        <>
            <div
                className={`${cx('selectStatus-container')}`}
                onClick={toggleOption}
            >
                <div
                    className={`${cx(
                        'selectStatus-value',
                        classStatus + 'bgc'
                    )}`}
                >
                    {textUtils.FirstUpc(statusUpdate) ||
                        textUtils.FirstUpc(statusCurrent)}
                </div>
                <Icons.SelectOptionArrowIcon />
                {selectStatus && (
                    <div
                        className={`${cx('status-container')}`}
                        onClick={toggleOptionTrue}
                    >
                        {LIST.map((item, index) => {
                            const classItem = item.name
                                .toLowerCase()
                                .replace(' ', '');
                            return (
                                <div
                                    key={index}
                                    className={`${
                                        classItem + 'bgc'
                                    } status border0`}
                                    onClick={() => setStatus(classItem)}
                                >
                                    {textUtils.FirstUpc(item.name)}
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

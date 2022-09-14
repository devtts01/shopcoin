import React from 'react';
import className from 'classnames/bind';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import { Icons } from '..';
import styles from './SelectStatus.module.css';

const cx = className.bind(styles);

function SelectStatus({status, rank}) {
    const { state, dispatch } = useAppContext();
    const { statusUpdate, statusCurrent } = state.set;
    const { selectStatus } = state.toggle;
    const setStatus = (status) => {
        dispatch(
            actions.setData({
                ...state.set,
                statusUpdate: status.charAt(0).toUpperCase() + status.slice(1),
            })
        );
    };
    const toggleOption = (e) => {
        e.stopPropagation();
        dispatch(
            actions.setData({
                ...state.set,
                statusUpdate: statusUpdate || statusCurrent,
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
        {name: 'Confirm'},
        {name: 'Complete'},
        {name: 'Cancel'},
        {name: 'On hold'}
    ];
    const RANK_LIST = [
        {name: 'VIP'},
        {name: 'Pro'},
        {name: 'Standard'}
    ];
    const LIST = rank ? RANK_LIST : STATUS_LIST;
    return (
        <>
            <div
                className={`${cx('selectStatus-container')}`}
                onClick={toggleOption}
            >
                <div className={`${cx('selectStatus-value', classStatus)}`}>
                    {statusUpdate || statusCurrent}
                </div>
                <Icons.SelectOptionArrowIcon />
                {selectStatus && (
                    <div
                        className={`${cx('status-container')}`}
                        onClick={toggleOptionTrue}
                    >
                        {LIST.map((item,index) => {
                            const classItem = item.name.toLowerCase().replace(' ', '');
                            return (<div
                            key={index}
                                className={`${cx('status', classItem)}`}
                                onClick={() => setStatus(classItem)}
                            >
                                {item.name}
                            </div>)
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default SelectStatus;

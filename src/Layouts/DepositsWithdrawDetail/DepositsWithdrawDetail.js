/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';
import { getDepositsWithdrawById } from '../../services/deposits';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';
import styles from './DepositsWithdrawDetail.module.css';

const cx = className.bind(styles);

function DepositsWithdrawDetail() {
    const { idDeposits, idWithdraw } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        edit,
        data: { dataUser },
    } = state.set;
    useEffect(() => {
        document.title = 'Detail | Shop Coin';
        getDepositsWithdrawById({
            idDeposits,
            idWithdraw,
            dispatch,
            state,
            actions,
        });
    }, []);
    function ItemRender({ title, info }) {
        return (
            <div className={`${cx('detail-item')}`}>
                <div className={`${cx('detail-title')}`}>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    <span className={`${cx('info')}`}>
                        {info ? info : <Skeleton width={50} />}
                    </span>
                </div>
            </div>
        );
    }
    const username = dataUser?.dataUser?.find(
        (x) => x.payment.email === edit?.itemData?.user
    )?.payment?.username;
    return (
        <>
            <div className={`${cx('detail-container')}`}>
                <div className={`${cx('detail-item')}`}>
                    <div className={`${cx('detail-title')}`}>Status</div>
                    <div className={`${cx('detail-status')}`}>
                        {edit?.itemData ? (
                            <>
                                <span
                                    className={`status fwb ${edit.itemData.status
                                        .toLowerCase()
                                        .replace(' ', '')}`}
                                >
                                    {edit.itemData.status}
                                </span>
                            </>
                        ) : (
                            <Skeleton width={50} />
                        )}
                    </div>
                </div>
                <ItemRender
                    title='Username'
                    info={edit?.itemData && username}
                />
                <ItemRender
                    title='Email'
                    info={edit?.itemData && edit?.itemData.user}
                />
                <ItemRender
                    title='Code'
                    info={edit?.itemData && edit?.itemData.code}
                />
                <ItemRender
                    title='Created'
                    info={
                        edit?.itemData &&
                        moment(edit?.itemData.createAt).format('DD/MM/YYYY')
                    }
                />
                <ItemRender
                    title='Amount USDT'
                    info={edit?.itemData && edit?.itemData.amountUsd}
                />
                <ItemRender
                    title='Amount VND'
                    info={edit?.itemData && edit?.itemData.amountVnd}
                />
                <ItemRender title='Deposit rate' />
                <ItemRender
                    title='Content'
                    info={edit?.itemData && edit?.itemData.symbol}
                />
                <ItemRender title='Payment method' />
                <ItemRender title='Document' />
            </div>
        </>
    );
}

export default DepositsWithdrawDetail;

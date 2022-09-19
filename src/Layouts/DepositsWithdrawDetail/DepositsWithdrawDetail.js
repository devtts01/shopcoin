/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Icons } from '../../components';
import moment from 'moment';
import { getDepositsWithdrawById } from '../../services/deposits';
import { useAppContext, textUtils, refreshPage } from '../../utils';
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
            <div className='detail-item'>
                <div className='detail-title'>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    <span className='info'>
                        {info ? info : <Skeleton width={30} />}
                    </span>
                </div>
            </div>
        );
    }
    const username = dataUser?.dataUser?.find(
        (x) => x.payment.email === edit?.itemData?.user
    )?.payment?.username;
    const x = edit?.itemData && edit?.itemData;
    return (
        <>
            <Button
                className='confirmbgc mb8'
                onClick={refreshPage.refreshPage}
            >
                <div className='flex-center'>
                    <Icons.RefreshIcon className='fz12 mr8' />
                    <span className={`${cx('general-button-text')}`}>
                        Refresh Page
                    </span>
                </div>
            </Button>
            <div className={`${cx('detail-container')}`}>
                <div className='detail-item'>
                    <div className='detail-title'>Status</div>
                    <div className={`${cx('detail-status')}`}>
                        {x ? (
                            <>
                                <span
                                    className={`status fwb ${
                                        x.status
                                            .toLowerCase()
                                            .replace(' ', '') + 'bgc'
                                    }`}
                                >
                                    {textUtils.FirstUpc(x.status)}
                                </span>
                            </>
                        ) : (
                            <Skeleton width={50} />
                        )}
                    </div>
                </div>
                <ItemRender title='Username' info={x && username} />
                <ItemRender title='Email' info={x && x.user} />
                <ItemRender title='Code' info={x && x.code} />
                <ItemRender
                    title='Created'
                    info={x && moment(x.createAt).format('DD/MM/YYYY')}
                />
                <ItemRender title='Amount USDT' info={x && x.amountUsd} />
                <ItemRender title='Amount VND' info={x && x.amountVnd} />
                <ItemRender title='Content' info={x && x.symbol} />
                <ItemRender title='Payment method' />
                {idDeposits && <ItemRender title='Document' />}
            </div>
        </>
    );
}

export default DepositsWithdrawDetail;

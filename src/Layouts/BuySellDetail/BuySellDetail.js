/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import { Button, Icons } from '../../components';
import { getBuySellById } from '../../services/buy';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppContext, textUtils, refreshPage } from '../../utils';
import { actions } from '../../app/';
import styles from './BuySellDetail.module.css';

const cx = className.bind(styles);

function BuySellDetail() {
    const { idBuy, idSell } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        edit,
        data: { dataUser },
    } = state.set;
    useEffect(() => {
        document.title = 'Detail | Shop Coin';
        getBuySellById({ idBuy, idSell, dispatch, state, actions });
    }, []);
    function ItemRender({ title, info, feeCustom }) {
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
        (x) => x.payment.email === edit?.itemData?.buyer.gmailUSer
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
            <div className='detail-container'>
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
                <ItemRender title='Email' info={x && x.buyer.gmailUSer} />
                <ItemRender title='Code' />
                <ItemRender
                    title='Created'
                    info={x && moment(x.createAt).format('DD/MM/YYYY')}
                />
                <ItemRender title='Symbol' info={x && x.symbol} />
                <ItemRender title='Sent' />
                <ItemRender title='Buy price' info={x && x.price} />
                <ItemRender title='Received' />
                <ItemRender title='Fee' info={x && x.fee} feeCustom />
                <ItemRender title='Document' />
            </div>
        </>
    );
}

export default BuySellDetail;

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button, Icons, Image } from '../../components';
import moment from 'moment';
import { getDepositsWithdrawById } from '../../services/deposits';
import {
    useAppContext,
    textUtils,
    refreshPage,
    numberUtils,
} from '../../utils';
import { actions } from '../../app/';
import styles from './DepositsWithdrawDetail.module.css';

const cx = className.bind(styles);

function DepositsWithdrawDetail() {
    const { idDeposits, idWithdraw } = useParams();
    const { state, dispatch } = useAppContext();
    const location = useLocation();
    const { edit } = state.set;
    useEffect(() => {
        document.title = 'Detail | Shop Coin Transactions';
        getDepositsWithdrawById({
            idDeposits,
            idWithdraw,
            dispatch,
            state,
            actions,
        });
    }, []);
    function ItemRender({
        title,
        info,
        bankInfo,
        methodBank,
        nameAccount,
        numberAccount,
    }) {
        return (
            <div className='detail-item'>
                <div className='detail-title'>{title}</div>
                <div className={`${cx('detail-status')}`}>
                    {bankInfo ? (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}
                        >
                            <span className='info'>
                                {methodBank ? (
                                    methodBank
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {nameAccount ? (
                                    nameAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                            <span className='info'>
                                {numberAccount ? (
                                    numberAccount
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </span>
                        </div>
                    ) : (
                        <span className='info'>
                            {info || info === 0 ? (
                                info
                            ) : (
                                <Skeleton width={30} />
                            )}
                        </span>
                    )}
                </div>
            </div>
        );
    }
    // const username = dataUser?.dataUser?.find(
    //     (x) => x.payment.email === edit?.itemData?.user
    // )?.payment?.username;
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
            <div className={`${cx('info-container')}`}>
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
                    {console.log(x)}
                    <ItemRender
                        title='Username'
                        info={x && x.method.accountName}
                    />
                    <ItemRender title='Email' info={x && x.user} />
                    <ItemRender title='Code' info={x && x.code} />
                    <ItemRender
                        title='Created'
                        info={
                            x &&
                            moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
                        }
                    />
                    <ItemRender
                        title='Amount USDT'
                        info={x && numberUtils.formatUSD(x.amountUsd)}
                    />
                    <ItemRender
                        title='Amount VND'
                        info={x && numberUtils.formatVND(x.amountVnd)}
                    />
                    <ItemRender title='Symbol' info={x && x.symbol} />
                    <ItemRender
                        title='Payment method'
                        bankInfo
                        methodBank={
                            x && location.pathname.includes('withdraw')
                                ? x.method.methodName
                                : x?.bankAdmin?.methodName
                        }
                        nameAccount={
                            x && location.pathname.includes('withdraw')
                                ? x.method.accountName
                                : x?.bankAdmin?.accountName
                        }
                        numberAccount={
                            x && location.pathname.includes('withdraw')
                                ? x.method.accountNumber
                                : x?.bankAdmin?.accountNumber
                        }
                    />
                    {idDeposits && (
                        <ItemRender
                            title='Document'
                            info={
                                x && (
                                    <a
                                        href={`${process.env.REACT_APP_URL_SERVER}${x.statement}`}
                                        target='_blank'
                                    >
                                        {x.statement ? (
                                            x.statement.replace('/images/', '')
                                        ) : (
                                            <Skeleton width='30px' />
                                        )}
                                    </a>
                                )
                            }
                        />
                    )}
                </div>
                {idDeposits && (
                    <div className={`${cx('detail-container')}`}>
                        <div className={`${cx('document-review-container')}`}>
                            <div className={`${cx('document-review-title')}`}>
                                Document Review
                            </div>
                            {x?.statement ? (
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.statement}`}
                                    alt={x.statement.replace('/images/', '')}
                                    className={`${cx('document-review-image')}`}
                                />
                            ) : (
                                <Skeleton width='100%' height='200px' />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default DepositsWithdrawDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import { FormInput, Button, Icons, Modal, Image } from '../../components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    checkErrorUsers,
    getUserById,
    changePasswordUser,
    refreshPasswordUser,
    blockAndUnblockUser,
    updateUSDGift,
} from '../../services/users';
import {
    useAppContext,
    requestRefreshToken,
    textUtils,
    deleteUtils,
    formUtils,
    alertUtils,
    refreshPage,
    numberUtils,
} from '../../utils';
import { actions } from '../../app/';
import styles from './UserDetail.module.css';

const cx = className.bind(styles);

function UserDetail() {
    const { idUser } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        form: { password },
        message: { upd, error },
        quantityCoin,
    } = state.set;
    const { modalDelete } = state.toggle;
    const x = edit?.itemData && edit?.itemData;
    useEffect(() => {
        document.title = `Detail | ${process.env.REACT_APP_TITLE_WEB}`;
        getUserById({ idUser, dispatch, state, actions });
    }, []);
    const changeInput = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    const changeQuantity = (e) => {
        dispatch(
            actions.setData({
                ...state.set,
                quantityCoin: e.target.value,
            })
        );
    };
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    const modalChangePwdTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalChangePwdFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    const handleChangePwd = async (data, id) => {
        changePasswordUser({
            data,
            id,
            dispatch,
            state,
            actions,
            password,
        });
    };
    const changePwd = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleChangePwd,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const handleRefreshPwd = async (data, id) => {
        refreshPasswordUser({ data, id, dispatch, state, actions });
    };
    const refreshPwd = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleRefreshPwd,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const handleUpdateUSD = async (data, id) => {
        updateUSDGift({
            data,
            id,
            usd: parseFloat(quantityCoin),
            dispatch,
            state,
            actions,
        });
    };
    const updateUSD = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUpdateUSD,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const handleBlockUser = async (data, id) => {
        blockAndUnblockUser({
            data,
            id,
            dispatch,
            state,
            actions,
            blockUser: x?.blockUser ? false : true,
        });
    };
    const onBlockAndUnblockUser = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleBlockUser,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    function ItemRender({
        title,
        info,
        feeCustom,
        bankInfo,
        methodBank,
        nameAccount,
        numberAccount,
    }) {
        return (
            <div className='detail-item'>
                <div className='detail-title' style={{ minWidth: '120px' }}>
                    {title}
                </div>
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

    return (
        <>
            <div className={`${cx('buySellDetail-container')}`}>
                {(upd || error) && (
                    <Alert
                        severity={upd ? 'success' : 'error'}
                        style={{ width: '100%' }}
                        onClose={handleCloseAlert}
                    >
                        {upd || error}
                    </Alert>
                )}
                <div className={`${cx('detail-container')}`}>
                    <div className='detail-item'>
                        <div className='detail-title'>Rank</div>
                        <div className={`${cx('detail-status')}`}>
                            {x ? (
                                <>
                                    <span
                                        className={`status fwb ${
                                            x.rank
                                                .toLowerCase()
                                                .replace(' ', '') + 'bgc'
                                        }`}
                                    >
                                        {textUtils.FirstUpc(x.rank)}
                                    </span>
                                </>
                            ) : (
                                <Skeleton width={50} />
                            )}
                        </div>
                    </div>
                    <ItemRender
                        title='Username'
                        info={x && x.payment.username}
                    />
                    <ItemRender title='Email' info={x && x.payment.email} />
                    <ItemRender title='Rule' info={x && x.payment.rule} />
                    <ItemRender
                        bankInfo
                        title='Bank Name'
                        methodBank={x && x.payment.bank.bankName}
                        nameAccount={x && x.payment.bank.name}
                        numberAccount={x && x.payment.bank.account}
                    />
                    <ItemRender
                        feeCustom
                        title='Deposits'
                        info={x && numberUtils.formatUSD(x.Wallet.deposit)}
                    />
                    <ItemRender
                        feeCustom
                        title='Withdraw'
                        info={x && numberUtils.formatUSD(x.Wallet.withdraw)}
                    />
                    <ItemRender
                        feeCustom
                        title='Balance'
                        info={x && numberUtils.formatUSD(x.Wallet.balance)}
                    />
                    <ItemRender
                        title='Created At'
                        info={
                            x &&
                            moment(x.createdAt).format('DD/MM/YYYY HH:mm:ss')
                        }
                    />
                </div>
                <div className={`${cx('detail-container')}`}>
                    <div className='w100'>
                        <div className='detail-item flex-column p0'>
                            <label className='label mr-auto'>Give USD</label>
                            <div className={`${cx('detail-coins-list')} w100`}>
                                <FormInput
                                    type='text'
                                    name='quantityCoin'
                                    placeholder='Quantity'
                                    classNameInput={`${cx(
                                        'fee-input'
                                    )} w100 mt0`}
                                    value={quantityCoin}
                                    onChange={changeQuantity}
                                />
                            </div>
                        </div>
                        <div className='detail-item justify-flex-end'>
                            <Button
                                onClick={() => updateUSD(idUser)}
                                className='vipbgc'
                                disabled={!quantityCoin}
                            >
                                Change
                            </Button>
                        </div>
                    </div>
                    <div className={`${cx('document-user-container')} w100`}>
                        <div className={`${cx('document-user-title')}`}>
                            1. Citizen Identification
                        </div>
                        {x?.uploadCCCDFont && x?.uploadCCCDBeside ? (
                            <div className={`${cx('document-user-item')}`}>
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.uploadCCCDFont}`}
                                    alt=''
                                    className={`${cx(
                                        'document-user-item-image'
                                    )}`}
                                />
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.uploadCCCDBeside}`}
                                    alt=''
                                    className={`${cx(
                                        'document-user-item-image'
                                    )}`}
                                />
                            </div>
                        ) : (
                            <Skeleton width='100%' height='200px' />
                        )}
                        <div className={`${cx('document-user-title')}`}>
                            2. License
                        </div>
                        {x?.uploadLicenseFont && x?.uploadLicenseBeside ? (
                            <div className={`${cx('document-user-item')}`}>
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.uploadLicenseFont}`}
                                    alt=''
                                    className={`${cx(
                                        'document-user-item-image'
                                    )}`}
                                />
                                <Image
                                    src={`${process.env.REACT_APP_URL_SERVER}/${x?.uploadLicenseBeside}`}
                                    alt=''
                                    className={`${cx(
                                        'document-user-item-image'
                                    )}`}
                                />
                            </div>
                        ) : (
                            <Skeleton width='100%' height='200px' />
                        )}
                    </div>
                </div>
                <div>
                    <Button
                        className='confirmbgc'
                        onClick={refreshPage.refreshPage}
                    >
                        <div className='flex-center'>
                            <Icons.RefreshIcon className='fz12 mr8' />
                            <span className={`${cx('general-button-text')}`}>
                                Refresh Page
                            </span>
                        </div>
                    </Button>
                    <Button
                        className='cancelbgc'
                        onClick={() => {
                            onBlockAndUnblockUser(idUser);
                        }}
                    >
                        <div className='flex-center'>
                            {!x?.blockUser ? (
                                <Icons.BlockUserIcon />
                            ) : (
                                <Icons.UnBlockUserIcon />
                            )}{' '}
                            <span className='ml8'>
                                {!x?.blockUser ? 'Block User' : 'Unblock User'}
                            </span>
                        </div>
                    </Button>
                    <Button
                        className='confirmbgc'
                        onClick={() => refreshPwd(idUser)}
                    >
                        <div className='flex-center'>
                            <Icons.RefreshPageIcon />{' '}
                            <span className='ml8'>Refresh Password</span>
                        </div>
                    </Button>
                    <Button
                        className='completebgc'
                        onClick={(e) => modalChangePwdTrue(e, idUser)}
                    >
                        <div className='flex-center'>
                            <Icons.EditIcon />{' '}
                            <span className='ml8'>Change Password</span>
                        </div>
                    </Button>
                </div>
            </div>
            {modalDelete && (
                <Modal
                    titleHeader='Change Password'
                    actionButtonText='Change'
                    closeModal={modalChangePwdFalse}
                    openModal={modalChangePwdTrue}
                    classNameButton='vipbgc'
                    onClick={() => changePwd(idUser)}
                >
                    <FormInput
                        type='password'
                        name='password'
                        placeholder='Enter new password...'
                        label='Password'
                        showPwd
                        onChange={changeInput}
                    />
                </Modal>
            )}
        </>
    );
}

export default UserDetail;

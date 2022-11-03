/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import { FormInput, Button, Icons, Modal, Search } from '../../components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    handleUpdateRankFeeUser,
    checkErrorUsers,
    getUserById,
    changeCoinGifts,
    searchCoinGift,
    updateCoinGift,
    changePasswordUser,
    refreshPasswordUser,
    blockUser,
    unblockUser,
} from '../../services/users';
import {
    useAppContext,
    requestRefreshToken,
    textUtils,
    deleteUtils,
    formUtils,
    searchUtils,
    alertUtils,
    refreshPage,
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
        pagination: { page, show },
        form: { password },
        searchValues: { coin },
        message: { upd, error },
        data: { dataSettingCoin },
        changeCoin,
        quantityCoin,
    } = state.set;
    const { modalDelete, selectStatus } = state.toggle;
    const [feeValue, setFeeValue] = useState(
        edit?.itemData && edit.itemData.fee
    );
    useEffect(() => {
        document.title = 'Detail | Shop Coin';
        getUserById({ idUser, dispatch, state, actions });
    }, []);
    const changeFee = (e) => {
        setFeeValue(e.target.value);
    };
    const changeQuantity = (e) => {
        dispatch(
            actions.setData({
                ...state.set,
                quantityCoin: e.target.value,
            })
        );
    };
    const handleChangeCoin = (coin) => {
        changeCoinGifts({ coin, selectStatus, dispatch, state, actions });
    };
    const toggleListCoin = () => {
        dispatch(
            actions.toggleModal({
                ...state.toggle,
                selectStatus: !selectStatus,
            })
        );
    };
    const changeInput = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    const searchCoin = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const modalChangePwdTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalChangePwdFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    const handleUpdateFee = async (data, id) => {
        await handleUpdateRankFeeUser({
            data,
            id,
            dispatch,
            state,
            actions,
            page,
            show,
            fee: parseFloat(feeValue),
        });
    };
    const updateFee = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUpdateFee,
                state,
                dispatch,
                actions,
                id
            );
            setFeeValue('');
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const handleUpdateCoin = async (data, id) => {
        updateCoinGift({
            data,
            id,
            changeCoin,
            quantityCoin,
            dispatch,
            state,
            actions,
        });
    };
    const updateCoin = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUpdateCoin,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
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
    const handleBlockUser = async (data, id) => {
        blockUser({
            data,
            id,
            dispatch,
            state,
            actions,
            blockUser: true,
        });
    };
    const onBlockUser = async (id) => {
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
    const handleUnBlockUser = async (data, id) => {
        unblockUser({
            data,
            id,
            dispatch,
            state,
            actions,
            blockUser: false,
        });
    };
    const onUnblockUser = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUnBlockUser,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const DATA_COINS =
        dataSettingCoin?.data?.map((coin) => {
            return {
                name: coin.symbol,
            };
        }) || [];
    DATA_COINS.push({ name: 'USDT' });
    // loại bỏ các object trùng nhau trong DATA_COINS
    const uniqueDataCoins = DATA_COINS.filter(
        (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    let DataCoinFlag = searchCoinGift({
        coin,
        dataCoins: uniqueDataCoins,
    });
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
    const x = edit?.itemData && edit?.itemData;

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
                        title='Bank Name'
                        info={x && x.payment.bank.bankName}
                    />
                    <ItemRender feeCustom title='Fee' info={x && x.fee} />
                    <ItemRender
                        title='Created At'
                        info={
                            x &&
                            moment(x.createAt).format('DD/MM/YYYY HH:MM:SS')
                        }
                    />
                </div>
                <div className={`${cx('detail-container')}`}>
                    <div className='detail-item align-flex-end'>
                        <FormInput
                            type='text'
                            name='fee'
                            placeholder='Fee'
                            classNameInput={`${cx('fee-input')}`}
                            label='Change Fee'
                            value={feeValue}
                            onChange={changeFee}
                        />
                        <Button
                            onClick={() => updateFee(idUser)}
                            className={`${cx('btn')} vipbgc`}
                            disabled={!feeValue}
                        >
                            Update
                        </Button>
                    </div>
                    <div className='detail-item flex-column'>
                        <label className='label mr-auto'>Change Coin</label>
                        <div className={`${cx('detail-coins-list')}`}>
                            <div className={`${cx('coins-list-container')}`}>
                                <div
                                    onClick={toggleListCoin}
                                    className='w100 flex-space-between'
                                >
                                    <div className={`${cx('coins-value')}`}>
                                        {changeCoin}
                                    </div>
                                    <Icons.SelectOptionArrowIcon />
                                </div>
                                {selectStatus && (
                                    <div className={`${cx('coins-list')}`}>
                                        <div
                                            className={`${cx('coins-search')}`}
                                        >
                                            <Search
                                                name='coin'
                                                className={`${cx(
                                                    'search-custom'
                                                )} w100 border0`}
                                                onChange={searchCoin}
                                            />
                                        </div>
                                        {DataCoinFlag.map((item, index) => (
                                            <div
                                                className={`${cx(
                                                    'coins-item'
                                                )}`}
                                                key={index}
                                                onClick={() =>
                                                    handleChangeCoin(item.name)
                                                }
                                            >
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <FormInput
                                type='text'
                                name='quantityCoin'
                                placeholder='Quantity'
                                classNameInput={`${cx('fee-input')} mt0`}
                                classNameField={`${cx('fee-field')}`}
                                value={quantityCoin}
                                onChange={changeQuantity}
                            />
                        </div>
                    </div>
                    <div className='detail-item justify-flex-end'>
                        <Button
                            onClick={() => updateCoin(idUser)}
                            className='vipbgc'
                            disabled={!coin && !quantityCoin}
                        >
                            Change
                        </Button>
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
                        onClick={
                            x?.blockUser
                                ? () => onUnblockUser(idUser)
                                : () => onBlockUser(idUser)
                        }
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

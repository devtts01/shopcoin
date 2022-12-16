/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import {
    FormInput,
    Button,
    Icons,
    Modal,
    Image,
    ModalViewImage,
} from '../../components';
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
    const [isModalImage, setIsModalImage] = useState(false);
    const [indexImage, setIndexImage] = useState(0);
    const [modalUrlImage, setModalUrlImage] = useState(null);
    const [isProcessUpdateUsd, setIsProcessUpdateUsd] = useState(false);
    const [isProcessChangePwd, setIsProcessChangePwd] = useState(false);
    const [isProcessBlockUser, setIsProcessBlockUser] = useState(false);
    const [isProcessRefreshPwd, setIsProcessRefreshPwd] = useState(false);
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
    const DATA_IMAGE_MODAL = [
        modalUrlImage ? modalUrlImage : null,
        x?.uploadCCCDFont,
        x?.uploadCCCDBeside,
        x?.uploadLicenseFont,
        x?.uploadLicenseBeside,
    ];
    const uniqueDataImageModal = DATA_IMAGE_MODAL.filter(
        (v, i, a) => a.findIndex((t) => t === v) === i
    );
    const modalImageTrue = (e, url) => {
        e.stopPropagation();
        setIsModalImage(true);
        setUrlModalImage(url);
    };
    const modalImageFalse = (e) => {
        e.stopPropagation();
        setIsModalImage(false);
        setUrlModalImage(null);
        setIndexImage(0);
    };
    const setUrlModalImage = (url) => {
        setModalUrlImage(url);
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
            await 1;
            setIsProcessChangePwd(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleChangePwd,
                    state,
                    dispatch,
                    actions,
                    id
                );
                setIsProcessChangePwd(false);
            }, 1000);
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
    const handleRefreshPwd = async (data, id) => {
        refreshPasswordUser({ data, id, dispatch, state, actions });
    };
    const refreshPwd = async (id) => {
        try {
            await 1;
            setIsProcessRefreshPwd(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleRefreshPwd,
                    state,
                    dispatch,
                    actions,
                    id
                );
                setIsProcessRefreshPwd(false);
            }, 1000);
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
            await 1;
            setIsProcessUpdateUsd(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleUpdateUSD,
                    state,
                    dispatch,
                    actions,
                    id
                );
                setIsProcessUpdateUsd(false);
            }, 1000);
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
            await 1;
            setIsProcessBlockUser(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleBlockUser,
                    state,
                    dispatch,
                    actions,
                    id
                );
                setIsProcessBlockUser(false);
            }, 1000);
        } catch (err) {
            checkErrorUsers(err, dispatch, state, actions);
        }
    };
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
    function ImageUploadRender({
        label,
        isCheck,
        imageFrontUrl,
        imageBesideUrl,
    }) {
        return (
            <>
                <div className={`${cx('document-user-title')}`}>{label}</div>
                {isCheck ? (
                    <div className={`${cx('document-user-item')}`}>
                        {/* <a
                            href={`${process.env.REACT_APP_URL_SERVER}/${imageFrontUrl}`}
                            target='_blank'
                            className={`${cx('document-user-item-image')}`}
                            rel='noreferrer'
                        >
                        </a> */}
                        <Image
                            src={`${process.env.REACT_APP_URL_SERVER}/${imageFrontUrl}`}
                            alt=''
                            className={`${cx('document-user-item-image-view')}`}
                            onClick={(e) => modalImageTrue(e, imageFrontUrl)}
                        />
                        {/* <a
                            href={`${process.env.REACT_APP_URL_SERVER}/${imageBesideUrl}`}
                            target='_blank'
                            className={`${cx('document-user-item-image')}`}
                            rel='noreferrer'
                        ></a> */}
                        <Image
                            src={`${process.env.REACT_APP_URL_SERVER}/${imageBesideUrl}`}
                            alt=''
                            className={`${cx('document-user-item-image-view')}`}
                            onClick={(e) => modalImageTrue(e, imageBesideUrl)}
                        />
                    </div>
                ) : (
                    <Skeleton width='100%' height='200px' />
                )}
            </>
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
                        title='Deposits'
                        info={x && numberUtils.formatUSD(x.Wallet.deposit)}
                    />
                    <ItemRender
                        title='Withdraw'
                        info={x && numberUtils.formatUSD(x.Wallet.withdraw)}
                    />
                    <ItemRender
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
                                disabled={!quantityCoin || isProcessUpdateUsd}
                                isProcess={isProcessUpdateUsd}
                            >
                                Change
                            </Button>
                        </div>
                    </div>
                    <div className={`${cx('document-user-container')} w100`}>
                        <ImageUploadRender
                            label='1. Citizen Identification'
                            isCheck={x?.uploadCCCDFont && x?.uploadCCCDBeside}
                            imageFrontUrl={x?.uploadCCCDFont}
                            imageBesideUrl={x?.uploadCCCDBeside}
                        />
                        <ImageUploadRender
                            label='2. License'
                            isCheck={
                                x?.uploadLicenseFont && x?.uploadLicenseBeside
                            }
                            imageFrontUrl={x?.uploadLicenseFont}
                            imageBesideUrl={x?.uploadLicenseBeside}
                        />
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
                        isProcess={isProcessBlockUser}
                        disabled={isProcessBlockUser}
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
                        isProcess={isProcessRefreshPwd}
                        disabled={isProcessRefreshPwd}
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
            <ModalViewImage
                stateModal={isModalImage}
                closeModal={modalImageFalse}
                uniqueData={uniqueDataImageModal}
                indexImage={indexImage}
                setIndexImage={setIndexImage}
            />
            {modalDelete && (
                <Modal
                    titleHeader='Change Password'
                    actionButtonText='Change'
                    closeModal={modalChangePwdFalse}
                    openModal={modalChangePwdTrue}
                    classNameButton='vipbgc'
                    onClick={() => changePwd(idUser)}
                    isProcess={isProcessChangePwd}
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

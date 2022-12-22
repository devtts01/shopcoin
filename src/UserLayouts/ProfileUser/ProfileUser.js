/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import className from 'classnames/bind';
import { AlertCp, Button, Icons, Modal } from '../../components';
import { actions } from '../../app/';
import {
    axiosUtils,
    numberUtils,
    refreshPage,
    requestRefreshToken,
    searchUtils,
    textUtils,
    useAppContext,
} from '../../utils';
import styles from './ProfileUser.module.css';
import moment from 'moment';
import {
    changeBankSelect,
    changePassword,
    createProfilePayment,
    uploadDocument,
} from '../../services/users';
import { searchBankAdminUser } from '../../services/coins';
import dataBank from '../../utils/FakeData/Bank';
import UploadDocumentUser from '../UploadDocumentUser/UploadDocumentUser';
import ProfilePaymentUser from '../ProfilePaymentUser/ProfilePaymentUser';
import ChangePwdUser from '../ChangePwdUser/ChangePwdUser';

const cx = className.bind(styles);

export default function ProfileUser() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        bankValue,
        searchValues: { bank },
    } = state.set;
    const [user, setUser] = useState(null);
    const [isProcess, setIsProcess] = useState(false);
    const [stateModalBank, setStateModalBank] = useState(false);
    const [stateModalUpload, setStateModalUpload] = useState(false);
    const [stateModalChangePwd, setStateModalChangePwd] = useState(false);
    const [stateModalProfilePayment, setStateModalProfilePayment] =
        useState(false);
    const [uploadCCCDFont, setUploadCCCDFont] = useState(null);
    const [uploadCCCDBeside, setUploadCCCDBeside] = useState(null);
    const [uploadLicenseFont, setUploadLicenseFont] = useState(null);
    const [uploadLicenseBeside, setUploadLicenseBeside] = useState(null);
    const [formChangePwd, setFormChangePwd] = useState({
        currentPwd: '',
        newPwd: '',
        confirmPwd: '',
    });
    const [formProfilePayment, setFormProfilePayment] = useState({
        accountName: '',
        accountNumber: '',
    });
    const getUser = async () => {
        const process = await axiosUtils.adminGet(
            `/getUser/${currentUser?.id}`
        );
        setUser(process.data);
    };
    useEffect(() => {
        getUser();
        document.title = `Profile | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const openModalChangePwd = useCallback((e) => {
        e.stopPropagation();
        setStateModalChangePwd(true);
    }, []);
    const closeModalChangePwd = useCallback((e) => {
        e.stopPropagation();
        setFormChangePwd({
            currentPwd: '',
            newPwd: '',
            confirmPwd: '',
        });
        setStateModalChangePwd(false);
    }, []);
    const openModalProfilePayment = useCallback((e) => {
        e.stopPropagation();
        setStateModalProfilePayment(true);
    }, []);
    const closeModalProfilePayment = useCallback((e) => {
        e.stopPropagation();
        setStateModalProfilePayment(false);
        setFormProfilePayment({
            accountName: '',
            accountNumber: '',
        });
    }, []);
    const openModalUpload = useCallback((e) => {
        e.stopPropagation();
        setStateModalUpload(true);
    }, []);
    const closeModalUpload = useCallback((e) => {
        e.stopPropagation();
        setStateModalUpload(false);
        setUploadCCCDFont(null);
        setUploadCCCDBeside(null);
        setUploadLicenseFont(null);
        setUploadLicenseBeside(null);
    }, []);
    const toogleModalBank = useCallback(
        (e) => {
            e.stopPropagation();
            setStateModalBank(!stateModalBank);
        },
        [stateModalBank]
    );
    const searchSelect = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const handleChangeBank = (bankValue) => {
        changeBankSelect({
            bankValue: bankValue,
            setStateModalProfilePayment,
            dispatch,
            state,
            actions,
        });
        setStateModalBank(false);
    };
    const handleChangeUploadCCCDFont = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadCCCDFont({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadCCCDFont]
    );
    const handleChangeUploadCCCDBeside = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadCCCDBeside({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadCCCDBeside]
    );
    const handleChangeUploadLicenseFont = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadLicenseFont({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadLicenseFont]
    );
    const handleChangeUploadLicenseBeside = useCallback(
        (e) => {
            const { files } = e.target;
            setUploadLicenseBeside({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        },
        [uploadLicenseBeside]
    );
    const uploadDocumentAPI = (data) => {
        uploadDocument({
            token: data?.token,
            cccdFont: uploadCCCDFont?.file,
            cccdBeside: uploadCCCDBeside?.file,
            licenseFont: uploadLicenseFont?.file,
            licenseBeside: uploadLicenseBeside?.file,
            state,
            dispatch,
            actions,
            setIsProcess,
            id: currentUser?.id,
        });
    };
    const handleSubmitFormUpload = useCallback(async (e) => {
        try {
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    uploadDocumentAPI,
                    state,
                    dispatch,
                    actions,
                    currentUser?.id
                );
                setStateModalUpload(false);
            }, 3000);
        } catch (err) {
            console.log(err);
        }
    });
    const handleChangeFormPwd = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormChangePwd({ ...formChangePwd, [name]: value });
        },
        [formChangePwd]
    );
    const handleChangeFormProfilePayment = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormProfilePayment({ ...formProfilePayment, [name]: value });
        },
        [formProfilePayment]
    );
    const changePwdAPI = (data) => {
        changePassword({
            id: currentUser?.id,
            oldPWD: formChangePwd?.currentPwd,
            newPWD: formChangePwd?.newPwd,
            token: data?.token,
            dispatch,
            actions,
            setIsProcess,
        });
    };
    const handleSubmitFormPwd = useCallback(
        async (e) => {
            try {
                if (
                    !formChangePwd.currentPwd ||
                    !formChangePwd.confirmPwd ||
                    !formChangePwd.newPwd
                ) {
                    alert('Please fill all fields');
                } else if (formChangePwd.newPwd !== formChangePwd.confirmPwd) {
                    alert('Password confirm not match with new password');
                } else {
                    await 1;
                    setIsProcess(true);
                    setTimeout(() => {
                        requestRefreshToken(
                            currentUser,
                            changePwdAPI,
                            state,
                            dispatch,
                            actions,
                            currentUser?.id
                        );
                        setStateModalChangePwd(false);
                    }, 3000);
                }
            } catch (err) {
                console.log(err);
            }
        },
        [formChangePwd]
    );
    const addBankInfoAPI = (data) => {
        createProfilePayment({
            id: currentUser?.id,
            bank: bankValue,
            accountName: formProfilePayment?.accountName,
            accountNumber: formProfilePayment?.accountNumber,
            token: data?.token,
            dispatch,
            actions,
            setIsProcess,
        });
    };
    const handleSubmitFormProfilePayment = useCallback(
        async (e) => {
            try {
                await 1;
                setIsProcess(true);
                setTimeout(() => {
                    requestRefreshToken(
                        currentUser,
                        addBankInfoAPI,
                        state,
                        dispatch,
                        actions,
                        currentUser?.id
                    );
                    setStateModalProfilePayment(false);
                }, 3000);
            } catch (err) {
                console.log(err);
            }
        },
        [formProfilePayment, bankValue]
    );
    const dataBankFlag = searchBankAdminUser({
        bank,
        data: dataBank,
    });
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
            <AlertCp />
            <div className={`${cx('info-container')}`}>
                <div className={`${cx('detail-container')}`}>
                    <div className={`${cx('info-detail')}`}>
                        <div className={`${cx('detail-item')}`}>
                            <div className={`${cx('item-title')}`}>Rank</div>
                            <div className={`${cx('item-desc')}`}>
                                <span
                                    className={`fwb ${user?.rank.toLowerCase()}`}
                                >
                                    {textUtils.FirstUpc(user?.rank) || '---'}
                                </span>
                            </div>
                        </div>
                        <div className={`${cx('detail-item')}`}>
                            <div className={`${cx('item-title')}`}>
                                Username
                            </div>
                            <div className={`${cx('item-desc')}`}>
                                {user?.payment?.username || '---'}
                            </div>
                        </div>
                        <div className={`${cx('detail-item')}`}>
                            <div className={`${cx('item-title')}`}>Email</div>
                            <div className={`${cx('item-desc')}`}>
                                {user?.payment?.email || '---'}
                            </div>
                        </div>
                        <div className={`${cx('detail-item')}`}>
                            <div className={`${cx('item-title')}`}>
                                Your wallet
                            </div>
                            <div className={`${cx('item-desc')} cancel`}>
                                {numberUtils.coinUSD(user?.Wallet?.balance) ||
                                    '---'}
                            </div>
                        </div>
                        <div className={`${cx('detail-item')}`}>
                            <div className={`${cx('item-title')}`}>
                                Created At
                            </div>
                            <div className={`${cx('item-desc')}`}>
                                {moment(user?.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                ) || '---'}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${cx('detail-container')}`}>
                    <div className={`${cx('info-detail', 'btn-container')}`}>
                        <Button
                            className='confirmbgc w100'
                            onClick={openModalUpload}
                        >
                            Upload Document
                        </Button>
                        <Button
                            className='completebgc w100 ml0 mt8'
                            onClick={openModalChangePwd}
                        >
                            Change Password
                        </Button>
                        <Button
                            className='vipbgc w100 ml0 mt8'
                            onClick={openModalProfilePayment}
                        >
                            Profile Payment
                        </Button>
                    </div>
                </div>
            </div>
            {stateModalUpload && (
                <Modal
                    titleHeader='Upload Document'
                    actionButtonText='Upload'
                    classNameButton='vipbgc'
                    openModal={openModalUpload}
                    closeModal={closeModalUpload}
                    onClick={handleSubmitFormUpload}
                    isProcess={isProcess}
                >
                    <UploadDocumentUser
                        user={user}
                        uploadCCCDFont='uploadCCCDFont'
                        urlUploadCCCDFont={uploadCCCDFont?.url}
                        uploadCCCDBeside='uploadCCCDBeside'
                        urlUploadCCCDBeside={uploadCCCDBeside?.url}
                        uploadLicenseFont='uploadLicenseFont'
                        urlUploadLicenseFont={uploadLicenseFont?.url}
                        uploadLicenseBeside='uploadLicenseBeside'
                        urlUploadLicenseBeside={uploadLicenseBeside?.url}
                        onChangeUploadCCCDFont={handleChangeUploadCCCDFont}
                        onChangeUploadCCCDBeside={handleChangeUploadCCCDBeside}
                        onChangeUploadLicenseFont={
                            handleChangeUploadLicenseFont
                        }
                        onChangeUploadLicenseBeside={
                            handleChangeUploadLicenseBeside
                        }
                    />
                </Modal>
            )}
            {stateModalChangePwd && (
                <Modal
                    titleHeader='Change Password'
                    actionButtonText='Change'
                    classNameButton='vipbgc'
                    openModal={openModalChangePwd}
                    closeModal={closeModalChangePwd}
                    onClick={handleSubmitFormPwd}
                    isProcess={isProcess}
                    disabled={
                        !formChangePwd.currentPwd ||
                        !formChangePwd.newPwd ||
                        !formChangePwd.confirmPwd
                    }
                >
                    <ChangePwdUser
                        onChange={handleChangeFormPwd}
                        nameCr='currentPwd'
                        nameNew='newPwd'
                        nameConfirm='confirmPwd'
                    />
                </Modal>
            )}
            {stateModalProfilePayment && (
                <Modal
                    titleHeader='Profile Payment'
                    actionButtonText='Submit'
                    classNameButton='vipbgc'
                    openModal={openModalProfilePayment}
                    closeModal={closeModalProfilePayment}
                    isProcess={isProcess}
                    onClick={handleSubmitFormProfilePayment}
                    disabled={
                        !formProfilePayment.accountName ||
                        !formProfilePayment.accountNumber ||
                        !bankValue
                    }
                >
                    <ProfilePaymentUser
                        toogleModalBank={toogleModalBank}
                        stateModalBank={stateModalBank}
                        bankValue={bankValue}
                        dataBankFlag={dataBankFlag}
                        searchSelect={searchSelect}
                        handleChangeBank={handleChangeBank}
                        nameAcc='accountName'
                        nameNum='accountNumber'
                        user={user}
                        onChange={handleChangeFormProfilePayment}
                    />
                </Modal>
            )}
        </>
    );
}

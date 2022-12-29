/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import className from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {
    getCoinById,
    checkFormCoins,
    checkErrorCoins,
    handleCreateCoinInactive,
    handleUpdateInactive,
} from '../../services/coins';
import {
    useAppContext,
    formUtils,
    fileUploadUtils,
    alertUtils,
    requestRefreshToken,
    refreshPage,
} from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { FormInput, FileUpload, Button, Icons } from '../../components';
import styles from './NewCoinInactive.module.css';

const cx = className.bind(styles);

function NewCoinInactive() {
    const { idCoin } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        fileRejections,
        edit,
        currentUser,
        message: { error },
        pagination: { page, show },
        searchValues: { settingCoin },
        form: { nameCoin, symbolCoin, fullName, logo },
    } = state.set;
    const [isProcess, setIsProcess] = useState(false);
    const refNameCoin = useRef();
    const refSymbolCoin = useRef();
    const refFullName = useRef();
    const refLogo = useRef();
    const history = useNavigate();
    useEffect(() => {
        document.title = `${
            edit.itemData ? 'Update Coin Inactive' : 'Create Coin Inactive'
        } | ${process.env.REACT_APP_TITLE_WEB}`;
    });
    useEffect(() => {
        getCoinById({ idCoin, dispatch, state, actions });
    }, []);
    // Modal + Input Form + File Upload
    const handleChange = (files) => {
        return fileUploadUtils.handleChange(files, dispatch, state, actions);
    };
    const handleRejected = (fileRejections) => {
        return fileUploadUtils.handleRejected(
            fileRejections,
            dispatch,
            state,
            actions
        );
    };
    const handleRemove = () => {
        return fileUploadUtils.handleRemove(dispatch, state, actions);
    };
    const resetForm = (e) => {
        dispatch(
            actions.setData({
                ...state.set,
                form: {
                    ...state.set.form,
                    nameCoin: '',
                    symbolCoin: '',
                    indexCoin: '',
                    fullName: '',
                    logo: null,
                },
                edit: {
                    id: '',
                    data: null,
                    itemData: null,
                },
            })
        );
    };
    const handleCloseAlert = () => {
        return alertUtils.closeAlert(dispatch, state, actions);
    };
    const handleChangeForm = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    // Add + Update Coin
    const handleAddCoinInactive = async (data) => {
        await handleCreateCoinInactive({
            data,
            dispatch,
            state,
            actions,
            nameCoin,
            symbolCoin,
            fullName,
            logo,
            history,
            page,
            show,
        });
    };
    const addNewCoinInactive = async (e) => {
        try {
            const isCheck = checkFormCoins({
                dispatch,
                state,
                actions,
                nameCoin,
                refNameCoin,
                symbolCoin,
                refSymbolCoin,
                fullName,
                refFullName,
                logo,
            });
            if (isCheck) {
                e.preventDefault();
                setIsProcess(true);
                setTimeout(() => {
                    requestRefreshToken(
                        currentUser,
                        handleAddCoinInactive,
                        state,
                        dispatch,
                        actions
                    );
                    dispatch(
                        actions.setData({
                            ...state.set,
                            message: {
                                ...state.set.message,
                                cre: 'Created Success',
                                error: '',
                                del: '',
                                upd: '',
                            },
                        })
                    );
                    setIsProcess(false);
                }, 1000);
            }
        } catch (err) {
            checkErrorCoins({ dispatch, state, actions, err });
        }
    };
    const handleUpdateCoinInactive = async (data, id) => {
        await handleUpdateInactive({
            data,
            dispatch,
            state,
            actions,
            nameCoin,
            symbolCoin,
            fullName,
            logo,
            page,
            show,
            id,
            search: settingCoin,
            history,
        });
    };
    const updateCoinInactive = async (e, id) => {
        try {
            e.preventDefault();
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleUpdateCoinInactive,
                    state,
                    dispatch,
                    actions,
                    id
                );
                dispatch(
                    actions.setData({
                        ...state.set,
                        message: {
                            ...state.set.message,
                            upd: 'Updated Success',
                            del: '',
                            error: '',
                            cre: '',
                        },
                    })
                );
                setIsProcess(false);
            }, 1000);
        } catch (err) {
            checkErrorCoins({ dispatch, state, actions, err });
        }
    };
    return (
        <>
            <div className={`${cx('newcoin-container')}`}>
                <div className='flex-space-between mb8'>
                    <h3 className={`${cx('newcoin-title')}`}>
                        Coin Inactive Information
                    </h3>
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
                </div>
                {error && (
                    <Alert severity='error' onClose={handleCloseAlert}>
                        {error}
                    </Alert>
                )}
                {/* FORM */}
                <div className={`${cx('newcoin-info-container')}`}>
                    <div className={`${cx('newcoin-info')}`}>
                        <FormInput
                            label='Name'
                            type='text'
                            placeholder='Enter your full name'
                            name='nameCoin'
                            value={nameCoin}
                            ref={refNameCoin}
                            onChange={handleChangeForm}
                            classNameField={`${cx('field-container')}`}
                        />
                        <FormInput
                            label='Symbol'
                            type='text'
                            placeholder='Enter coin short name'
                            name='symbolCoin'
                            value={symbolCoin}
                            ref={refSymbolCoin}
                            onChange={handleChangeForm}
                            classNameField={`${cx('field-container')}`}
                        />
                    </div>
                    <div className={`${cx('newcoin-info')}`}>
                        <FormInput
                            label='FullName'
                            type='text'
                            placeholder='Enter fullName'
                            name='fullName'
                            value={fullName}
                            ref={refFullName}
                            onChange={handleChangeForm}
                            classNameField={`${cx('field-container')}`}
                        />
                    </div>
                </div>
                <FileUpload
                    ref={refLogo}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    onRejected={handleRejected}
                    fileRejections={fileRejections}
                />
                <div className={`${cx('actions-container')}`}>
                    <Button
                        className='cancelbgc text-center'
                        to={`${routers.coinInactive}`}
                        onClick={resetForm}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='confirmbgc'
                        onClick={
                            edit?.itemData
                                ? (e) => updateCoinInactive(e, idCoin)
                                : addNewCoinInactive
                        }
                        isProcess={isProcess}
                        disabled={
                            isProcess ||
                            !fullName ||
                            !logo ||
                            !symbolCoin ||
                            !nameCoin
                        }
                    >
                        {edit?.itemData ? 'Update' : 'Add'}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default NewCoinInactive;

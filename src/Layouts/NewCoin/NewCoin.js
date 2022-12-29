/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import className from 'classnames/bind';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { getUsers } from '../../services/users';
import {
    searchBlacklistUsers,
    getCoinById,
    handleApplyBlacklist,
    handleDeleteBlacklist,
    handleCreate,
    checkFormCoins,
    checkErrorCoins,
    handleUpdate,
} from '../../services/coins';
import {
    useAppContext,
    DataBlacklistUsers,
    searchUtils,
    formUtils,
    fileUploadUtils,
    deleteUtils,
    alertUtils,
    requestRefreshToken,
    handleUtils,
    refreshPage,
    useDebounce,
} from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import {
    FormInput,
    FileUpload,
    Search,
    Button,
    Icons,
    TableData,
    ActionsTable,
    Modal,
    Toggle,
    Checkbox,
} from '../../components';
import styles from './NewCoin.module.css';

const cx = className.bind(styles);

function NewCoin() {
    const { idCoin } = useParams();
    const { state, dispatch } = useAppContext();
    const {
        fileRejections,
        edit,
        currentUser,
        message: { del, error },
        pagination: { page, show },
        searchValues: { userBlacklist, settingCoin },
        data: { dataUser, dataBlacklistUser = [] },
        form: { nameCoin, symbolCoin, indexCoin, fullName, logo },
    } = state.set;
    const { hideAllUser, modalDelete } = state.toggle;
    const [isProcess, setIsProcess] = useState(false);
    const [dataUserFake, setDataUserFake] = useState([...dataBlacklistUser]);
    const refCheckbox = useRef();
    const refNameCoin = useRef();
    const refSymbolCoin = useRef();
    const refFullName = useRef();
    const refLogo = useRef();
    const history = useNavigate();
    useEffect(() => {
        document.title = `${edit.itemData ? 'Update Coin' : 'Create Coin'} | ${
            process.env.REACT_APP_TITLE_WEB
        }`;
    });
    const useDebounceUser = useDebounce(userBlacklist, 500);
    useEffect(() => {
        getUsers({
            dispatch,
            state,
            actions,
            page,
            show,
            search: userBlacklist,
        });
        getCoinById({ idCoin, dispatch, state, actions, setDataUserFake });
    }, [page, show, useDebounceUser]);
    let searchDataFlag = searchBlacklistUsers({
        userBlacklist,
        dataUser: dataUser?.dataUser || dataUser?.data,
    });
    // Modal + Input Form + File Upload
    const toggleDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const toggleDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
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
    const handleChangeSearch = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const handleChangeForm = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    const handleToggleHideAll = () => {
        dispatch(
            actions.toggleModal({
                ...state.toggle,
                hideAllUser: !hideAllUser,
            })
        );
    };
    const handleSetValueChecked = (e, item) => {
        if (e.target.checked) {
            setDataUserFake([...dataUserFake, item]);
        } else {
            setDataUserFake(
                dataUserFake.filter((user) => user._id !== item._id)
            );
        }
    };
    // Set + Delete userBlackList
    const handleApply = () => {
        handleApplyBlacklist({
            userBlacklist,
            dispatch,
            state,
            actions,
            dataUserFake,
        });
    };
    const handleDeleteBlacklistUser = async (id) => {
        handleDeleteBlacklist({
            dispatch,
            state,
            actions,
            id,
            setDataUserFake,
            dataUserFake,
        });
    };
    // Add + Update Coin
    const handleAddCoin = async (data) => {
        await handleCreate({
            data,
            dispatch,
            state,
            actions,
            nameCoin,
            symbolCoin,
            indexCoin,
            fullName,
            logo,
            hideAllUser,
            dataBlacklistUser,
            history,
            page,
            show,
            dataUser,
        });
    };
    const addNewCoin = async (e) => {
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
                        handleAddCoin,
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
    const handleUpdateCoin = async (data, id) => {
        await handleUpdate({
            data,
            dispatch,
            state,
            actions,
            nameCoin,
            symbolCoin,
            indexCoin,
            fullName,
            logo,
            hideAllUser,
            dataBlacklistUser,
            page,
            show,
            id,
            search: settingCoin,
            history,
        });
    };
    const updateCoin = async (e, id) => {
        try {
            e.preventDefault();
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleUpdateCoin,
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
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index} style={{ fontSize: '15px' }}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td>{item.payment.username}</td>
                            <td>{item.payment.email}</td>
                            <td>
                                <ActionsTable
                                    onClickDel={(e) =>
                                        toggleDeleteTrue(e, item._id)
                                    }
                                ></ActionsTable>
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    return (
        <>
            <div className={`${cx('newcoin-container')}`}>
                <div className='flex-space-between mb8'>
                    <h3 className={`${cx('newcoin-title')}`}>
                        Coin Information
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
                        {/* <FormInput
                            label='Index'
                            type='text'
                            placeholder='Enter index'
                            name='indexCoin'
                            value={indexCoin}
                            ref={refIndexCoin}
                            onChange={handleChangeForm}
                            classNameField={`${cx('field-container')}`}
                            readOnly
                        /> */}
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
                {/* FILE UPLOAD */}
                <FileUpload
                    ref={refLogo}
                    onChange={handleChange}
                    onRemove={handleRemove}
                    onRejected={handleRejected}
                    fileRejections={fileRejections}
                />
                <h3 className={`${cx('newcoin-title')} mb0 mt24`}>
                    User setting
                </h3>
                <p className={`${cx('user-setting-desc')}`}>
                    Select user belongs to blacklist to hide
                </p>
                <Toggle
                    status={hideAllUser}
                    label='Hide all user'
                    onChange={handleToggleHideAll}
                />
                {!hideAllUser && (
                    <>
                        <div className={`${cx('search-user-container')}`}>
                            <div className={`${cx('search-container')}`}>
                                <div
                                    className={`${cx(
                                        'search-container-relative'
                                    )}`}
                                >
                                    <Search
                                        placeholder='Search and select user to blacklist'
                                        className={`${cx('search')}`}
                                        name='userBlacklist'
                                        value={userBlacklist}
                                        onChange={handleChangeSearch}
                                    />
                                    {userBlacklist && (
                                        <div
                                            className={`${cx(
                                                'blacklist-container',
                                                'blacklist-absolute'
                                            )}`}
                                        >
                                            {searchDataFlag.length > 0 ? (
                                                searchDataFlag.map(
                                                    (item, index) => (
                                                        <Checkbox
                                                            index={index}
                                                            htmlFor={item._id}
                                                            value={item._id}
                                                            onChange={(e) =>
                                                                handleSetValueChecked(
                                                                    e,
                                                                    item
                                                                )
                                                            }
                                                            label={
                                                                item.payment
                                                                    .username
                                                            }
                                                            checked={
                                                                dataUserFake.find(
                                                                    (x) =>
                                                                        x._id ===
                                                                        item._id
                                                                ) !== undefined
                                                            }
                                                            ref={refCheckbox}
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <div className='text-center text-italic'>
                                                    <p className='mb0 fz16'>
                                                        No data
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    className='vipbgc'
                                    onClick={handleApply}
                                    disabled={!userBlacklist}
                                >
                                    Apply
                                </Button>
                            </div>
                            {del && (
                                <Alert
                                    style={{ marginTop: '12px' }}
                                    severity='success'
                                    onClose={handleCloseAlert}
                                >
                                    {del}
                                </Alert>
                            )}
                        </div>
                        <div className={`${cx('user-list-container')}`}>
                            {dataBlacklistUser.length > 0 ? (
                                <TableData
                                    data={dataBlacklistUser}
                                    headers={DataBlacklistUsers().headers}
                                    totalData={dataBlacklistUser.length}
                                >
                                    <RenderBodyTable data={dataBlacklistUser} />
                                </TableData>
                            ) : (
                                <div className={`${cx('none-blacklist')}`}>
                                    <Icons.BlacklistUserImage />
                                </div>
                            )}
                        </div>
                    </>
                )}
                <div className={`${cx('actions-container')}`}>
                    <Button
                        // className={`${cx('cancel')}`}
                        className='cancelbgc text-center'
                        to={`${routers.settingCoin}`}
                        onClick={resetForm}
                    >
                        Cancel
                    </Button>
                    <Button
                        className='confirmbgc'
                        onClick={
                            edit?.itemData
                                ? (e) => updateCoin(e, idCoin)
                                : addNewCoin
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
            {modalDelete && (
                <Modal
                    titleHeader='Delete User Blacklist'
                    actionButtonText='Delete'
                    openModal={toggleDeleteTrue}
                    closeModal={toggleDeleteFalse}
                    classNameButton='delete-button'
                    onClick={() => handleDeleteBlacklistUser(edit.id)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this user blacklist?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default NewCoin;

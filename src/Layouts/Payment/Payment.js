/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import className from 'classnames/bind';
import { Modal, FormInput, ActionsTable, SelectStatus } from '../../components';
import { actions } from '../../app/';
import { General } from '../';
import {
    getPayments,
    checkFormPayment,
    checkErrorPayment,
    searchPayment,
    handleCreate,
    handleUpdate,
    handleDelete,
    SVupdateRate,
    handleUpdateType,
} from '../../services/payments';
import {
    DataPayments,
    useAppContext,
    modalUtils,
    requestRefreshToken,
    handleUtils,
    deleteUtils,
    formUtils,
    localStoreUtils,
} from '../../utils';
import styles from './Payment.module.css';
import { TrStatus } from '../../components/TableData/TableData';

const cx = className.bind(styles);

function Payment() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        statusUpdate,
        statusCurrent,
        message: { error },
        data: { dataPayment },
        searchValues: { payment },
        pagination: { page, show },
        form: {
            accountName,
            bankName,
            accountNumber,
            rateDeposit,
            rateWithdraw,
        },
    } = state.set;
    const { modalPaymentEdit, modalDelete, modalStatus } = state.toggle;
    const [modalRate, setModalRate] = useState(false);
    const [rateUpdate, setRateUpdate] = useState({
        rateDeposit: null,
        rateWithdraw: null,
    });
    // Ref Input
    const refAccountName = useRef();
    const refBankName = useRef();
    const refAccountNumber = useRef();
    const refRateDeposit = useRef();
    const refRateWidthdraw = useRef();
    const refRateDepositUpdate = useRef();
    const refRateWidthdrawUpdate = useRef();
    useEffect(() => {
        document.title = 'Payment | Shop Coin';
    }, []);
    useEffect(() => {
        getPayments({ dispatch, state, actions, page, show });
    }, [page, show]);
    const dataUserFlag = searchPayment({
        payment,
        dataPayment: dataPayment.data,
    });
    // Modal Payment + Input Form
    const modalPaymentTrue = (e, item) => {
        return modalUtils.modalTrue(
            e,
            item,
            dispatch,
            state,
            actions,
            'modalPaymentEdit'
        );
    };
    const modalPaymentFalse = (e) => {
        return modalUtils.modalFalse(
            e,
            dispatch,
            state,
            actions,
            'modalPaymentEdit'
        );
    };
    const modalRateTrue = (e) => {
        e.stopPropagation();
        setModalRate(true);
    };
    const modalRateFalse = (e) => {
        e.stopPropagation();
        setModalRate(false);
    };
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    const toggleEditTrue = async (e, status, id) => {
        await localStoreUtils.setStore({
            ...currentUser,
            idUpdate: id,
        });
        deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
    };
    const toggleEditFalse = (e) => {
        return deleteUtils.statusFalse(e, dispatch, state, actions);
    };
    const handleChange = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
    };
    const handleChangeRate = (e) => {
        const { name, value } = e.target;
        setRateUpdate({ ...rateUpdate, [name]: value });
    };
    // Create + Update Payment
    const handleCreatePayment = async (data) => {
        await handleCreate({
            data,
            dispatch,
            state,
            actions,
            bankName,
            accountName,
            accountNumber,
            rateDeposit,
            rateWithdraw,
            page,
            show,
        });
    };
    const createPayment = async (e) => {
        try {
            const isCheck = checkFormPayment({
                bankName,
                accountName,
                accountNumber,
                refAccountName,
                refBankName,
                refAccountNumber,
            });
            if (isCheck) {
                e.preventDefault();
                requestRefreshToken(
                    currentUser,
                    handleCreatePayment,
                    state,
                    dispatch,
                    actions
                );
            }
        } catch (err) {
            checkErrorPayment({ dispatch, state, actions, err });
        }
    };
    const handleUpdatePayment = async (data, id) => {
        await handleUpdate({
            data,
            id,
            dispatch,
            state,
            actions,
            bankName,
            accountName,
            accountNumber,
            rateDeposit,
            rateWithdraw,
            page,
            show,
        });
    };
    const updatePayment = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUpdatePayment,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorPayment({ dispatch, state, actions, err });
        }
    };
    const handleUpdateTypePayment = async (data, id) => {
        handleUpdateType({
            data,
            id,
            dispatch,
            state,
            actions,
            statusUpdate,
            statusCurrent,
            page,
            show,
        });
    };
    const updatedTypePayment = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleUpdateTypePayment,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorPayment({ dispatch, state, actions, err });
        }
    };
    const handleDeletePayment = async (data, id) => {
        await handleDelete({
            data,
            id,
            dispatch,
            state,
            actions,
            page,
            show,
        });
    };
    const deletePayment = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeletePayment,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorPayment({ dispatch, state, actions, err });
        }
    };
    const updateRate = async () => {
        try {
            await 1;
            SVupdateRate({
                rateDeposit: rateUpdate.rateDeposit,
                rateWithdraw: rateUpdate.rateWithdraw,
                page,
                show,
                state,
                dispatch,
                actions,
            });
            // console.log(rateUpdate);
            setRateUpdate({ rateDeposit: null, rateWithdraw: null });
            setModalRate(false);
        } catch (err) {
            console.log(err);
        }
    };
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td className='upc'>
                                {handleUtils.indexTable(page, show, index)}
                            </td>
                            <td>
                                {item.accountName || <Skeleton width={50} />}
                            </td>
                            <td>
                                {item.methodName || <Skeleton width={50} />}
                            </td>
                            <td>
                                {item.accountNumber || <Skeleton width={50} />}
                            </td>
                            <td>{item.rateDeposit || 0}</td>
                            <td>{item.rateWithdraw || 0}</td>
                            <td>
                                <TrStatus
                                    item={item.type}
                                    onClick={(e) =>
                                        toggleEditTrue(e, item.type, item._id)
                                    }
                                />
                            </td>

                            <td>
                                <ActionsTable
                                    edit
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickEdit={(e) =>
                                        modalPaymentTrue(e, item)
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
            <General
                valueSearch={payment}
                nameSearch='payment'
                textBtnNew='New Payment'
                textBtnUpdateAllFields='Update Rate'
                onCreate={modalPaymentTrue}
                onUpdateRate={modalRateTrue}
                dataFlag={dataUserFlag}
                dataHeaders={DataPayments().headers}
                totalData={dataPayment.total}
                classNameButton='completebgc'
                classNameButtonUpdateAllFields='vipbgc'
            >
                <RenderBodyTable data={dataUserFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Change Type Payment'
                    actionButtonText='Submit'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    classNameButton='vipbgc'
                    onClick={() =>
                        updatedTypePayment(currentUser?.idUpdate || edit.id)
                    }
                >
                    <p className='modal-delete-desc'>
                        Are you sure change type payment?
                    </p>
                    <SelectStatus typePayment />
                </Modal>
            )}
            {modalPaymentEdit && (
                <Modal
                    titleHeader={edit.itemData ? 'Edit Payment' : 'New Payment'}
                    actionButtonText={edit.itemData ? 'Update' : 'Create'}
                    closeModal={modalPaymentFalse}
                    openModal={modalPaymentTrue}
                    classNameButton='vipbgc'
                    errorMessage={error}
                    onClick={
                        edit.itemData
                            ? () => updatePayment(edit.itemData._id)
                            : createPayment
                    }
                >
                    {/* <FormInput
                        label='Type payment'
                        type='text'
                        placeholder='Enter type payment'
                        name='typePayment'
                        value={typePayment}
                        ref={refTypePayment}
                        onChange={handleChange}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    /> */}
                    <FormInput
                        label='Account Name'
                        type='text'
                        placeholder='Enter account name'
                        name='accountName'
                        value={accountName}
                        onChange={handleChange}
                        ref={refAccountName}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                    <FormInput
                        label='Bank Name'
                        type='text'
                        placeholder='Enter bank name'
                        name='bankName'
                        value={bankName}
                        onChange={handleChange}
                        ref={refBankName}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                    <FormInput
                        label='Account Number'
                        type='text'
                        placeholder='Enter account number'
                        name='accountNumber'
                        value={accountNumber}
                        ref={refAccountNumber}
                        onChange={handleChange}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                    <FormInput
                        label='Rate Deposit'
                        type='text'
                        placeholder='Enter rate deposit'
                        name='rateDeposit'
                        value={rateDeposit}
                        ref={refRateDeposit}
                        onChange={handleChange}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                    <FormInput
                        label='Rate widthdraw'
                        type='text'
                        placeholder='Enter rate widthdraw'
                        name='rateWithdraw'
                        value={rateWithdraw}
                        ref={refRateWidthdraw}
                        onChange={handleChange}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Delete Payment'
                    actionButtonText='Delete'
                    openModal={modalDeleteFalse}
                    closeModal={modalDeleteFalse}
                    classNameButton='cancelbgc'
                    onClick={() => deletePayment(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this payment?
                    </p>
                </Modal>
            )}
            {modalRate && (
                <Modal
                    titleHeader={'Update Rate Deposit & Widthdraw'}
                    actionButtonText={'Update'}
                    closeModal={modalRateFalse}
                    openModal={modalRateTrue}
                    classNameButton='vipbgc'
                    errorMessage={error}
                    onClick={updateRate}
                >
                    <FormInput
                        label='Rate Deposit'
                        type='text'
                        placeholder='Enter rate deposit'
                        name='rateDeposit'
                        value={rateUpdate.rateDeposit}
                        onChange={handleChangeRate}
                        ref={refRateDepositUpdate}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                    <FormInput
                        label='Rate Withdraw'
                        type='text'
                        placeholder='Enter rate withdraw'
                        name='rateWithdraw'
                        value={rateUpdate.rateWithdraw}
                        onChange={handleChangeRate}
                        ref={refRateWidthdrawUpdate}
                        classNameField={`${cx('payment-form-field')}`}
                        classNameInput={`${cx('payment-form-input')}`}
                    />
                </Modal>
            )}
        </>
    );
}

export default Payment;

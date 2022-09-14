/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import className from 'classnames/bind';
import { Modal, FormInput, ActionsTable } from '../../components';
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
} from '../../services/payments';
import {
    DataPayments,
    useAppContext,
    modalUtils,
    requestRefreshToken,
    handleUtils,
    deleteUtils,
    formUtils,
} from '../../utils';
import styles from './Payment.module.css';

const cx = className.bind(styles);

function Payment() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
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
    const { modalPaymentEdit, modalDelete } = state.toggle;
    // Ref Input
    const refAccountName = useRef();
    const refBankName = useRef();
    const refAccountNumber = useRef();
    const refRateDeposit = useRef();
    const refRateWithdraw = useRef();
    useEffect(() => {
        getPayments({ dispatch, state, actions, page, show });
    }, [page, show]);
    const dataUserFlag = searchPayment({
        payment,
        dataPayment: dataPayment.dataUser,
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
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    const handleChange = (e) => {
        return formUtils.changeForm(e, dispatch, state, actions);
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
                                {item.accountName || <Skeleton with={50} />}
                            </td>
                            <td>{item.methodName || <Skeleton with={50} />}</td>
                            <td>
                                {item.accountNumber || <Skeleton with={50} />}
                            </td>
                            <td>{item.rateDeposit || 0}</td>
                            <td>{item.rateWithdraw || 0}</td>
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
                onCreate={modalPaymentTrue}
                dataFlag={dataUserFlag}
                dataHeaders={DataPayments().headers}
                totalData={dataPayment.total}
            >
                <RenderBodyTable data={dataUserFlag} />
            </General>
            {modalPaymentEdit && (
                <Modal
                    titleHeader={edit.itemData ? 'Edit Payment' : 'New Payment'}
                    actionButtonText={edit.itemData ? 'Update' : 'Create'}
                    closeModal={modalPaymentFalse}
                    openModal={modalPaymentTrue}
                    errorMessage={error}
                    onClick={
                        edit.itemData
                            ? () => updatePayment(edit.itemData._id)
                            : createPayment
                    }
                >
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
                        label='Rate Withdraw'
                        type='text'
                        placeholder='Enter rate withdraw'
                        name='rateWithdraw'
                        value={rateWithdraw}
                        ref={refRateWithdraw}
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
                    classNameButton={`${cx('delete-button')}`}
                    onClick={() => deletePayment(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this payment?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default Payment;

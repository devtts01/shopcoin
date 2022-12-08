/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import className from 'classnames/bind';
import { Modal, FormInput, ActionsTable } from '../../components';
import { actions } from '../../app/';
import { General } from '..';
import moment from 'moment';
import { getRates, SVupdateRate } from '../../services/rate';
import {
    DataRates,
    useAppContext,
    handleUtils,
    requestRefreshToken,
} from '../../utils';
import styles from './Rate.module.css';
import { formatVND } from '../../utils/format/FormatMoney';

const cx = className.bind(styles);

function Rate() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        message: { error },
        data: { dataRate },
        // searchValues: { rate },
        pagination: { page, show },
    } = state.set;
    const [modalRate, setModalRate] = useState(false);
    const [isProcess, setIsProcess] = useState(false);
    const [rateUpdate, setRateUpdate] = useState({
        rateDeposit: null,
        rateWithdraw: null,
    });
    const refRateDepositUpdate = useRef();
    const refRateWidthdrawUpdate = useRef();
    useEffect(() => {
        document.title = `Payment | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    useEffect(() => {
        getRates({ dispatch, state, actions });
    }, [page, show]);
    const modalRateTrue = (e, item) => {
        e.stopPropagation();
        setModalRate(true);
        setRateUpdate({
            rateDeposit: item.rateDeposit,
            rateWithdraw: item.rateWithdraw,
        });
    };
    const modalRateFalse = (e) => {
        e.stopPropagation();
        setModalRate(false);
    };
    const handleChangeRate = (e) => {
        const { name, value } = e.target;
        setRateUpdate({ ...rateUpdate, [name]: value });
    };
    const handleUpdateRate = (data) => {
        SVupdateRate({
            token: data?.token,
            rateDeposit: rateUpdate.rateDeposit,
            rateWithdraw: rateUpdate.rateWithdraw,
            state,
            dispatch,
            actions,
        });
    };
    const updateRate = async () => {
        try {
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleUpdateRate,
                    state,
                    dispatch,
                    actions
                );
                setRateUpdate({ rateDeposit: null, rateWithdraw: null });
                setModalRate(false);
                setIsProcess(false);
            }, 1000);
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
                                {formatVND(item?.rateDeposit) || (
                                    <Skeleton width={50} />
                                )}
                            </td>
                            <td>
                                {formatVND(item?.rateWithdraw) || (
                                    <Skeleton width={50} />
                                )}
                            </td>
                            <td>
                                {moment(item?.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                ) || <Skeleton width={50} />}
                            </td>
                            <td>
                                <ActionsTable
                                    edit
                                    noDel
                                    onClickEdit={(e) => modalRateTrue(e, item)}
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
                noSearch
                dataFlag={[dataRate?.data]}
                dataHeaders={DataRates().headers}
                totalData={[dataRate?.data]?.length}
                classNameButton='completebgc'
                classNameButtonUpdateAllFields='vipbgc'
            >
                <RenderBodyTable data={[dataRate?.data]} />
            </General>
            {modalRate && (
                <Modal
                    titleHeader={'Update Rate Deposit & Widthdraw'}
                    actionButtonText={'Update'}
                    closeModal={modalRateFalse}
                    openModal={modalRateTrue}
                    classNameButton='vipbgc'
                    errorMessage={error}
                    onClick={updateRate}
                    isProcess={isProcess}
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

export default Rate;

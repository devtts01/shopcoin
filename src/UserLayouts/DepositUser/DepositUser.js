/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import className from 'classnames/bind';
import styles from './DepositUser.module.css';
import { General } from '../../Layouts';
import {
    axiosUtils,
    DataDepositUser,
    handleUtils,
    numberUtils,
    requestRefreshToken,
    searchUtils,
    useAppContext,
} from '../../utils';
import { useNavigate } from 'react-router-dom';
import { actions } from '../../app/';
import { searchBankAdminUser, searchDepositUser } from '../../services/coins';
import { changeBankSelect } from '../../services/users';
import {
    ActionsTable,
    FormInput,
    Icons,
    Modal,
    SelectValue,
} from '../../components';
import { TrObjectIcon } from '../../components/TableData/TableData';
import moment from 'moment';
import routers from '../../routers/routers';
import { handleCreate } from '../../services/deposits';

const cx = className.bind(styles);

function RenderBodyTable({ data }) {
    const { state } = useAppContext();
    const {
        pagination: { page, show },
    } = state.set;
    return (
        <>
            {data.map((item, index) => {
                const sendReceived = {
                    send: {
                        icon: <Icons.SendIcon />,
                        title: 'Send',
                        number: numberUtils.formatVND(item?.amountVnd),
                    },
                    received: {
                        icon: <Icons.ReceivedIcon />,
                        title: 'Received',
                        number: numberUtils.formatUSD(item?.amount),
                    },
                };
                return (
                    <tr key={item?._id}>
                        <td>{handleUtils.indexTable(page, show, index)}</td>
                        <td className='item-w150'>{item?.symbol}</td>
                        <td>
                            <TrObjectIcon item={sendReceived} />
                        </td>
                        <td className='item-w150'>---</td>
                        <td className='item-w100'>
                            {moment(item?.createdAt).format(
                                'DD/MM/YYYY HH:mm:ss'
                            )}
                        </td>
                        <td className='item-w150'>
                            <div>{item?.bankAdmin?.methodName}</div>
                            <div>{item?.bankAdmin?.accountName}</div>
                            <div>{item?.bankAdmin?.accountNumber}</div>
                        </td>
                        <td style={{ alignItems: 'center' }}>
                            <span
                                className={`status ${
                                    item?.status
                                        ?.toLowerCase()
                                        .replace(/\s/g, '') + 'bgc'
                                }`}
                            >
                                {item?.status}
                            </span>
                        </td>
                        <td>
                            <ActionsTable
                                view
                                noDel
                                linkView={`${routers.depositUser}/${item?._id}`}
                            />
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

export default function DepositUser() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        bankValue,
        searchValues: { depositUser, bank },
    } = state.set;
    const { selectBank } = state.toggle;
    const [data, setData] = useState(null);
    const [dataPaymentAdmin, setDataPaymentAdmin] = useState(null);
    const [rate, setRate] = useState(null);
    const [amountUSD, setAmountUSD] = useState();
    const [stateModalBank, setStateModalBank] = useState(false);
    const [isProcess, setIsProcess] = useState(false);
    const history = useNavigate();
    const getDepositByEmail = async () => {
        const resGet = await axiosUtils.userGet(
            `/getAllDeposits/${currentUser?.email}`
        );
        setData(resGet.data);
    };
    const getPaymentAdmin = async () => {
        const resGet = await axiosUtils.adminGet('/getAllPaymentAdmin', {});
        setDataPaymentAdmin(resGet.data);
    };
    const getRate = async () => {
        const resGet = await axiosUtils.adminGet('/getRates');
        setRate(resGet.data);
    };
    useEffect(() => {
        getDepositByEmail();
        getPaymentAdmin();
        getRate();
    }, []);
    const openModal = useCallback((e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                selectBank: true,
            })
        );
    }, []);
    const closeModal = useCallback((e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                selectBank: false,
            })
        );
    }, []);
    const toogleModalBank = useCallback(
        (e) => {
            e.stopPropagation();
            setStateModalBank(!stateModalBank);
        },
        [stateModalBank]
    );
    const searchSelect = useCallback((e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    }, []);
    const handleChangeAmountUSD = useCallback((e) => {
        setAmountUSD(e.target.value);
    }, []);
    const handleChangeBank = useCallback(
        (bankValue) => {
            changeBankSelect({
                bankValue,
                selectBank,
                dispatch,
                state,
                actions,
            });
            setStateModalBank(false);
        },
        [bankValue, selectBank]
    );
    const createDepositsAPI = (data) => {
        handleCreate({
            amount: amountUSD,
            email: currentUser.email,
            amountVnd: parseFloat(amountUSD * rate?.rateDeposit),
            token: data?.token,
            bankAdmin: bankValue,
            dispatch,
            actions,
            history,
            setIsProcess,
            setData,
        });
    };
    const handleSubmit = useCallback(
        async (e) => {
            try {
                await 1;
                setIsProcess(true);
                setTimeout(() => {
                    // console.log(amountUSD, bankValue);
                    requestRefreshToken(
                        currentUser,
                        createDepositsAPI,
                        state,
                        dispatch,
                        actions
                    );
                }, 3000);
            } catch (e) {
                console.log(e);
            }
        },
        [amountUSD, bankValue, isProcess, data]
    );
    const dataSettingFlag = searchDepositUser({
        depositUser,
        data: data,
    });
    const dataBankFlag = searchBankAdminUser({
        bank,
        data: dataPaymentAdmin,
    });
    const idDisabled = amountUSD && bankValue ? true : false;
    return (
        <>
            <General
                className={cx('setting-coin')}
                valueSearch={depositUser}
                nameSearch='depositUser'
                dataFlag={dataSettingFlag}
                dataHeaders={DataDepositUser().headers}
                totalData={10}
                classNameButton='completebgc'
                textBtnNew='Create Deposit'
                noActions
                onCreate={openModal}
            >
                <RenderBodyTable data={dataSettingFlag} />
            </General>
            {selectBank && (
                <Modal
                    titleHeader='Create Deposit'
                    actionButtonText='Submit'
                    classNameButton='vipbgc'
                    openModal={openModal}
                    closeModal={closeModal}
                    isProcess={isProcess}
                    onClick={handleSubmit}
                    disabled={!amountUSD || !bankValue}
                >
                    <FormInput
                        label='Amount USD'
                        placeholder='Enter amount USD'
                        type='text'
                        name='amountUSD'
                        onChange={handleChangeAmountUSD}
                    />
                    <SelectValue
                        label='Choose payment method'
                        nameSearch='bank'
                        toggleModal={toogleModalBank}
                        stateModal={stateModalBank}
                        valueSelect={bankValue?.methodName}
                        onChangeSearch={searchSelect}
                        dataFlag={dataBankFlag}
                        onClick={handleChangeBank}
                    />
                    {idDisabled && (
                        <div className='fz16 complete fwb'>
                            Deposits (VND):{' '}
                            {numberUtils.formatVND(
                                amountUSD * rate?.rateDeposit || 0
                            )}
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}

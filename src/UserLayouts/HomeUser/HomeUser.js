/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import className from 'classnames/bind';
import { useNavigate, Link } from 'react-router-dom';
import { actions } from '../../app/';
import {
    ActionsTable,
    AlertCp,
    Button,
    FormInput,
    Icons,
    Modal,
    SelectValue,
    TableData,
} from '../../components';
import { searchBankAdminUser } from '../../services/coins';
import { changeBankSelect } from '../../services/users';
import {
    axiosUtils,
    DataTableRateUser,
    numberUtils,
    refreshPage,
    requestRefreshToken,
    searchUtils,
    useAppContext,
} from '../../utils';
import styles from './HomeUser.module.css';
import routers from '../../routers/routers';
import { handleCreate } from '../../services/withdraws';
import { handleCreate as handleCreateBuy } from '../../services/deposits';

const cx = className.bind(styles);

export default function HomeUser() {
    const { state, dispatch } = useAppContext();
    const {
        currentUser,
        bankValue,
        searchValues: { bank },
    } = state.set;
    const { selectBank, modalWithdraw } = state.toggle;
    const [dataPaymentAdmin, setDataPaymentAdmin] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [rateBuy, setRateBuy] = React.useState();
    const [rateSell, setRateSell] = React.useState();
    const [isProcess, setIsProcess] = React.useState(false);
    const [stateModalBank, setStateModalBank] = React.useState(false);
    const [error, setError] = React.useState('');
    const [amountUSD, setAmountUSD] = React.useState();
    const [amountUSDWithraw, setAmountUSDWithdraw] = React.useState();
    const history = useNavigate();
    const dataRate = [
        {
            id: 1,
            action: 'Deposit',
            textButton: 'Buy',
            rate: numberUtils.formatVND(rateBuy),
        },
        {
            id: 2,
            action: 'Withdraw',
            textButton: 'Sell',
            rate: numberUtils.formatVND(rateSell),
        },
    ];
    const getPaymentAdmin = async () => {
        const resGet = await axiosUtils.adminGet('/getPaymentAdmin', {});
        setDataPaymentAdmin(resGet.data);
    };
    const getRateBuySell = async () => {
        const resGetBuy = await axiosUtils.adminGet('/getRateBuy');
        const resGetSell = await axiosUtils.adminGet('/getRateSell');
        setRateBuy(resGetBuy.data);
        setRateSell(resGetSell.data);
    };
    const getUser = async () => {
        const process = await axiosUtils.adminGet(
            `/getUser/${currentUser?.id}`
        );
        setUser(process.data);
    };
    useEffect(() => {
        getPaymentAdmin();
        getRateBuySell();
        getUser();
        document.title = `Home | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const openModal = useCallback((e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                selectBank: true,
            })
        );
    }, []);
    const openModalWithdraw = useCallback((e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                modalWithdraw: true,
            })
        );
    }, []);
    const closeModal = useCallback((e) => {
        e.stopPropagation();
        setAmountUSD('');
        dispatch(
            actions.toggleModal({
                selectBank: false,
            })
        );
    }, []);
    const closeModalWithdraw = useCallback((e) => {
        e.stopPropagation();
        dispatch(
            actions.toggleModal({
                modalWithdraw: false,
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
    const handleChangeAmountUSD = useCallback((e) => {
        setAmountUSD(e.target.value);
    }, []);
    const handleChangeAmountUSDWithdraw = useCallback((e) => {
        if (e.target.value) {
            if (e.target.value < 10) {
                setError('Amount USD must be greater than 10');
            } else if (isNaN(e.target.value)) {
                setError('Amount USD must be number');
            } else {
                setError('');
            }
            setAmountUSDWithdraw(e.target.value);
        } else {
            setError('');
            setAmountUSDWithdraw('');
        }
    }, []);
    const searchSelect = useCallback((e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
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
        handleCreateBuy({
            amount: amountUSD,
            id: currentUser?.id,
            amountVnd: numberUtils.precisionRound(
                parseFloat(amountUSD * rateBuy)
            ),
            token: data?.token,
            bankAdmin: bankValue[0],
            rateDeposit: parseFloat(rateBuy),
            dispatch,
            actions,
            history,
            setIsProcess,
        });
    };
    const handleSubmit = useCallback(
        async (e) => {
            try {
                await 1;
                setIsProcess(true);
                setTimeout(() => {
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
        [amountUSD, bankValue, isProcess, rateBuy]
    );
    const createWithdrawAPI = (data) => {
        handleCreate({
            amountUSD: parseFloat(amountUSDWithraw),
            amountVnd: numberUtils.precisionRound(amountUSDWithraw * rateSell),
            id: currentUser?.id,
            rateWithdraw: parseFloat(rateSell),
            dispatch,
            state,
            actions,
            token: data?.token,
            setIsProcess,
        });
    };
    const handleSubmitWithdraw = useCallback(
        async (e) => {
            try {
                await 1;
                setIsProcess(true);
                setTimeout(() => {
                    requestRefreshToken(
                        currentUser,
                        createWithdrawAPI,
                        state,
                        dispatch,
                        actions
                    );
                }, 3000);
            } catch (e) {
                console.log(e);
            }
        },
        [amountUSDWithraw, isProcess, rateSell]
    );
    const dataBankFlag = searchBankAdminUser({
        bank,
        data: dataPaymentAdmin,
    });
    const idDisabled = amountUSD && bankValue ? true : false;
    const isShowBodyModalWithdarw =
        (user?.Wallet?.balance || user?.Wallet?.balance === 0) &&
        user?.payment?.bank?.bankName &&
        user?.payment?.bank?.name &&
        user?.payment?.bank?.account &&
        user?.uploadCCCDBeside &&
        user?.uploadCCCDFont &&
        user?.uploadLicenseBeside &&
        user?.uploadLicenseFont;
    const RenderBodyTableRate = ({ data }) => {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={item?.id} style={{ fontSize: '14px' }}>
                            <td className='item-w150'>{item.action}</td>
                            <td className='item-w150 text-left'>{item.rate}</td>
                            <td className='item-w20'>
                                <ActionsTable
                                    view
                                    noDel
                                    textButton={item.textButton}
                                    bgcButtonCustom={
                                        item.textButton === 'Buy'
                                            ? 'confirmbgc'
                                            : 'cancelbgc'
                                    }
                                    onClickCreate={
                                        item.textButton === 'Buy'
                                            ? openModal
                                            : openModalWithdraw
                                    }
                                />
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    };
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
            <TableData
                data={dataRate}
                totalData={dataRate.length}
                headers={DataTableRateUser().headers}
                search=''
                noActions
            >
                <RenderBodyTableRate data={dataRate} />
            </TableData>
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
                    <div className='fz16 fwb text-right'>
                        Rate Buy:{' '}
                        <span className='confirm'>
                            {numberUtils.formatVND(rateBuy)}
                        </span>
                    </div>
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
                            {numberUtils.formatVND(amountUSD * rateBuy || 0)}
                        </div>
                    )}
                </Modal>
            )}
            {modalWithdraw && (
                <Modal
                    titleHeader='Create Withdraw'
                    actionButtonText='Submit'
                    classNameButton='vipbgc'
                    openModal={openModalWithdraw}
                    closeModal={closeModalWithdraw}
                    isProcess={isProcess}
                    disabled={error || !amountUSD}
                    onClick={handleSubmitWithdraw}
                    hideButton={!isShowBodyModalWithdarw}
                >
                    {isShowBodyModalWithdarw ? (
                        <>
                            <div className={`${cx('info-user')}`}>
                                <div className={`${cx('info-user-item')}`}>
                                    <div className={`${cx('info-user-title')}`}>
                                        Your Wallet
                                    </div>
                                    <div
                                        className={`${cx(
                                            'info-user-desc'
                                        )} vip`}
                                    >
                                        {numberUtils.coinUSD(
                                            user?.Wallet?.balance
                                        )}
                                    </div>
                                </div>
                                <div className={`${cx('info-user-item')}`}>
                                    <div className={`${cx('info-user-title')}`}>
                                        Your bank account
                                    </div>
                                    <div
                                        className={`${cx(
                                            'info-user-desc'
                                        )} complete`}
                                    >
                                        <div className='text-right'>
                                            {user?.payment?.bank?.bankName}
                                        </div>
                                        <div className='text-right'>
                                            {user?.payment?.bank?.name}
                                        </div>
                                        <div className='text-right'>
                                            {user?.payment?.bank?.account}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='fz16 fwb text-right'>
                                Rate Sell:{' '}
                                <span className='cancel'>
                                    {numberUtils.formatVND(rateSell)}
                                </span>
                            </div>
                            <FormInput
                                label='Amount USD'
                                placeholder='Enter amount USD'
                                type='text'
                                name='amountUSDWithraw'
                                onChange={handleChangeAmountUSDWithdraw}
                            />
                            {error && (
                                <div className='cancel fz14'>{error}</div>
                            )}
                            {amountUSD && (
                                <div className='fz16 complete fwb'>
                                    Receive (VND):{' '}
                                    {numberUtils.formatVND(
                                        amountUSD * rateSell || 0
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={`${cx('text-desc')}`}>
                            You don't have a payment account yet or you haven't
                            uploaded the document yet, please create one before
                            doing so. Click{' '}
                            <Link
                                to={`${routers.profileUser}`}
                                onClick={closeModalWithdraw}
                            >
                                here
                            </Link>{' '}
                            create payment and upload documents. Thank you!
                        </div>
                    )}
                </Modal>
            )}
        </>
    );
}

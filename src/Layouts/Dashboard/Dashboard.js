/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import { actions } from '../../app/';
import moment from 'moment';
import styles from './Dashboard.module.css';
import {
    Button,
    Icons,
    Modal,
    Search,
    SearchDate,
    SelectValue,
    TableData,
} from '../../components';
import {
    DataDashboard,
    DataUserBalance,
    dateUtils,
    handleUtils,
    numberUtils,
    refreshPage,
    searchUtils,
    useAppContext,
    useDebounce,
} from '../../utils';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';
import { getCoinsUserBuy } from '../../services/coins';
import { SVtotal } from '../../services/dashboard';
import { FirstUpc } from '../../utils/format/LetterFirstUpc';
import periodDate from '../../utils/FakeData/PeriodDate';

const cx = className.bind(styles);

const ChartItem = ({ title, value, link, to }) => {
    return (
        <div className={`${cx('item')}`}>
            {link ? (
                <Link to={to} className={`${cx('title-link')}`}>
                    {title}
                </Link>
            ) : (
                <div className={`${cx('title')}`}>{title}</div>
            )}
            <div className={`${cx('value')}`}>{value}</div>
        </div>
    );
};
function RenderBodyTable({ data }) {
    const { state } = useAppContext();
    const {
        pagination: { page, show },
    } = state.set;
    return (
        <>
            {data.map((item, index) => {
                return (
                    <tr key={item?._id} className='fz14'>
                        <td className='upc'>
                            {handleUtils.indexTable(page, show, index)}
                        </td>
                        <td>{item.symbol}</td>
                        <td className='text-left'>{item.total}</td>
                    </tr>
                );
            })}
        </>
    );
}
function RenderBodyTableUser({ data }) {
    const { state } = useAppContext();
    const {
        pagination: { page, show },
    } = state.set;
    return (
        <>
            {data.map((item, index) => {
                return (
                    <tr key={item?._id} style={{ fontSize: '14px' }}>
                        <td className='upc'>
                            {handleUtils.indexTable(page, show, index)}
                        </td>
                        <td className='item-w150'>{item.payment.username}</td>
                        <td className='item-w150 text-left'>
                            {item.payment.email}
                        </td>
                        <td className='text-left'>
                            {numberUtils.formatUSD(item.Wallet.balance)}
                        </td>
                        <td className='text-left'>
                            <span
                                className={`${
                                    item.payment.rule + 'bgc'
                                } status`}
                            >
                                {item.payment.rule}
                            </span>
                        </td>
                        <td className='text-left'>
                            <span
                                className={`${
                                    item.rank.toLowerCase() + 'bgc'
                                } status`}
                            >
                                {FirstUpc(item.rank)}
                            </span>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

function Dashboard() {
    const { state, dispatch } = useAppContext();
    const {
        totalDeposit,
        totalWithdraw,
        totalBalance,
        totalCommission,
        dataUserBalance,
        data: { dataDashboard },
        searchValues: { dateFrom, dateTo, dashboard, userBalance },
        pagination: { page, show },
    } = state.set;
    const [isProcess, setIsProcess] = React.useState(false);
    const [isModalDate, setIsModalDate] = React.useState(false);
    const [isPeriod, setIsPeriod] = React.useState(false);
    const [period, setPeriod] = React.useState(null);
    const [date, setDate] = React.useState({
        from: null,
        to: null,
    });
    useEffect(() => {
        document.title = `Dashboard | ${process.env.REACT_APP_TITLE_WEB}`;
        SVtotal({
            state,
            dispatch,
            actions,
            page,
            show,
            search: userBalance,
        });
    }, []);
    const useDebounceDashboard = useDebounce(dashboard, 500);
    const useDebounceUserBalance = useDebounce(userBalance, 500);
    useEffect(() => {
        if (useDebounceDashboard || useDebounceUserBalance) {
            setTimeout(() => {
                dispatch(
                    actions.setData({
                        pagination: { page: 1, show: 10 },
                    })
                );
            }, 500);
        }
    }, [useDebounceDashboard, useDebounceUserBalance]);
    useEffect(() => {
        getCoinsUserBuy({
            page,
            show: dashboard ? dataDashboard?.data?.total : show,
            dispatch,
            state,
            actions,
        });
        SVtotal({
            state,
            dispatch,
            actions,
            page,
            show,
            search: useDebounceUserBalance,
        });
    }, [page, show, useDebounceDashboard, useDebounceUserBalance]);
    // console.log(dataUserBalance);
    let data = dataDashboard?.data?.coins || [];
    if (dashboard) {
        data = data.filter((item) => {
            return (
                searchUtils.searchInput(dashboard, item.symbol) ||
                searchUtils.searchInput(dashboard, item.total)
            );
        });
    }
    let dataUser = dataUserBalance?.users || [];
    const openModalDate = (e) => {
        e.stopPropagation();
        setIsModalDate(true);
    };
    const closeModalDate = (e) => {
        e.stopPropagation();
        setIsModalDate(false);
        setPeriod(null);
        setDate({
            from: null,
            to: null,
        });
        dispatch(
            actions.setData({
                searchValues: {
                    dateFrom: null,
                    dateTo: null,
                },
            })
        );
    };
    const tooglePeriod = (e) => {
        e.stopPropagation();
        setIsPeriod(!isPeriod);
    };
    const handleChangePeriod = (item) => {
        const date = new Date();
        const toDate = new Date();
        let fromDate = new Date();
        switch (item.toLowerCase().replace(/\s/g, '')) {
            case 'today':
                fromDate = new Date();
                break;
            case 'yesterday':
                fromDate = new Date(date.setDate(date.getDate() - 1));
                break;
            case 'thisweek':
                fromDate = new Date(date.setDate(date.getDate() - 7));
                break;
            case 'lastweek':
                fromDate = new Date(date.setDate(date.getDate() - 14));
                break;
            case 'thismonth':
                fromDate = new Date(date.setDate(date.getDate() - 30));
                break;
            case 'lastmonth':
                fromDate = new Date(date.setDate(date.getDate() - 60));
                break;
            case 'thisyear':
                fromDate = new Date(date.setDate(date.getDate() - 365));
                break;
            case 'lastyear':
                fromDate = new Date(date.setDate(date.getDate() - 730));
                break;
            default:
                fromDate = new Date();
                break;
        }
        dispatch(
            actions.setData({
                searchValues: {
                    dateFrom: dateUtils.dateVnFormat2(fromDate),
                    dateTo: dateUtils.dateVnFormat2(toDate),
                },
            })
        );
        setPeriod(item);
        setIsPeriod(false);
    };
    const handleChangeDate = (e) => {
        const { name, value } = e.target;
        dispatch(
            actions.setData({
                searchValues: { [name]: value },
            })
        );
    };
    const changeSearch = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const handleSend = async () => {
        try {
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                SVtotal({
                    state,
                    dispatch,
                    actions,
                    fromDate: dateFrom || new Date().toISOString(),
                    toDate: dateTo || new Date().toISOString(),
                    page,
                    show,
                    search: useDebounceUserBalance
                        ? useDebounceUserBalance
                        : '',
                });
                setIsProcess(false);
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };
    const onSelectDate = (e) => {
        e.stopPropagation();
        setIsModalDate(false);
        setDate({
            from: dateFrom || dateUtils.dateVnFormat2(new Date()),
            to: dateTo || dateUtils.dateVnFormat2(new Date()),
        });
    };
    return (
        <div className={`${cx('dashboard-container')}`}>
            <div className={`${cx('general-top')}`}>
                <div className='flex-center mt8'>
                    <Button
                        className={`${cx('general-button')} cancelbgc`}
                        onClick={openModalDate}
                    >
                        <Icons.SearchDateIcon />
                        <span className={`${cx('general-button-text')}`}>
                            Select Date Report
                        </span>
                    </Button>
                    <Button
                        className={`${cx('general-button')} completebgc`}
                        onClick={handleSend}
                        isProcess={isProcess}
                        disabled={isProcess}
                    >
                        <span className={`${cx('general-button-icon')}`}>
                            <i className='fa-regular fa-paper-plane'></i>
                        </span>
                        <span className={`${cx('general-button-text')}`}>
                            Send
                        </span>
                    </Button>
                    <Button
                        className='confirmbgc'
                        onClick={refreshPage.refreshPage}
                        style={{ width: 'max-content' }}
                    >
                        <div className='flex-center'>
                            <Icons.RefreshIcon className='fz12' />
                            <span className={`${cx('general-button-text')}`}>
                                Refresh Page
                            </span>
                        </div>
                    </Button>
                </div>
            </div>
            {date.from && date.to && (
                <div className={`${cx('desc-report')}`}>
                    Report from{' '}
                    <span className='cancel'>
                        {moment(date.from).format('DD/MM/YYYY')}
                    </span>{' '}
                    to{' '}
                    <span className='cancel'>
                        {moment(date.to).format('DD/MM/YYYY')}
                    </span>
                </div>
            )}
            <div className={`${cx('chart-container')}`}>
                <div className={`${cx('chart-item-container')}`}>
                    <ChartItem
                        title='Total Deposits'
                        value={numberUtils.formatUSD(
                            totalDeposit ? totalDeposit : 0
                        )}
                        link
                        to={routers.deposits}
                    />
                    <ChartItem
                        title='Total Withdraw'
                        value={numberUtils.formatUSD(
                            totalWithdraw ? totalWithdraw : 0
                        )}
                        link
                        to={routers.withdraw}
                    />
                    <ChartItem
                        title='Balance'
                        value={numberUtils.formatUSD(
                            totalBalance ? totalBalance : 0
                        )}
                    />
                    <ChartItem
                        title='Commission'
                        value={numberUtils.formatUSD(totalCommission)}
                    />
                </div>
            </div>
            <div className={`${cx('general-table-container')}`}>
                <div className={`${cx('title-header')}`}>Danh sách Symbol</div>
                <Search
                    name='dashboard'
                    value={dashboard}
                    onChange={changeSearch}
                    className={`${cx('search-coin')}`}
                />
                <TableData
                    data={data}
                    totalData={
                        dashboard ? data?.length : dataDashboard?.data?.total
                    }
                    headers={DataDashboard().headers}
                    search=''
                    noActions
                >
                    <RenderBodyTable data={data} />
                </TableData>
            </div>
            <div className={`${cx('general-table-container')}`}>
                <div className={`${cx('title-header')}`}>
                    Danh sách user còn balance
                </div>
                <Search
                    name='userBalance'
                    value={userBalance}
                    onChange={changeSearch}
                    className={`${cx('search-coin')}`}
                />
                <TableData
                    data={dataUser}
                    totalData={dataUserBalance?.totalUser}
                    headers={DataUserBalance().headers}
                    search=''
                    noActions
                >
                    <RenderBodyTableUser data={dataUser} />
                </TableData>
            </div>
            {isModalDate && (
                <Modal
                    titleHeader='Select date report'
                    actionButtonText='Select'
                    openModal={openModalDate}
                    closeModal={closeModalDate}
                    classNameButton='vipbgc'
                    onClick={onSelectDate}
                >
                    <SelectValue
                        label='Period'
                        toggleModal={tooglePeriod}
                        stateModal={isPeriod}
                        dataFlag={periodDate}
                        onClick={handleChangePeriod}
                        valueSelect={period ? period : 'Today'}
                    />
                    <div className={`${cx('search-container')}`}>
                        <div className={`${cx('search-title')}`}>From</div>
                        <SearchDate
                            name='dateFrom'
                            value={
                                dateFrom
                                    ? dateFrom
                                    : dateUtils.dateVnFormat2(new Date())
                            }
                            onChange={handleChangeDate}
                            className={`${cx('search')}`}
                        />
                    </div>
                    <div className={`${cx('search-container')}`}>
                        <div className={`${cx('search-title')}`}>To</div>
                        <SearchDate
                            name='dateTo'
                            value={
                                dateTo
                                    ? dateTo
                                    : dateUtils.dateVnFormat2(new Date())
                            }
                            onChange={handleChangeDate}
                            className={`${cx('search')}`}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Dashboard;

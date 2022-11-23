/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import 'react-loading-skeleton/dist/skeleton.css';
import { actions } from '../../app/';
import styles from './Dashboard.module.css';
import { Button, Icons, Search, SearchDate, TableData } from '../../components';
import {
    DataUserBalance,
    dateUtils,
    handleUtils,
    numberUtils,
    refreshPage,
    searchUtils,
    useAppContext,
} from '../../utils';
import { Link } from 'react-router-dom';
import routers from '../../routers/routers';
import { getCoinsUserBuy } from '../../services/coins';
import { SVtotal } from '../../services/dashboard';
import { TrStatus } from '../../components/TableData/TableData';

const cx = className.bind(styles);

function Dashboard() {
    const { state, dispatch } = useAppContext();
    const {
        totalDeposit,
        totalWithdraw,
        totalBalance,
        // totalCommission,
        dataUserBalance,
        searchValues: { dateFrom, dateTo, userBalance },
        pagination: { page, show },
    } = state.set;
    useEffect(() => {
        document.title = 'Dashboard | Shop Coin Transactions';
        SVtotal({
            state,
            dispatch,
            actions,
        });
    }, []);
    useEffect(() => {
        getCoinsUserBuy({
            page,
            show,
            dispatch,
            state,
            actions,
        });
        SVtotal({
            state,
            dispatch,
            actions,
        });
    }, [page, show]);
    let dataUser = dataUserBalance?.users || [];
    if (userBalance) {
        dataUser = dataUser.filter((item) => {
            return (
                searchUtils.searchInput(userBalance, item.payment.username) ||
                searchUtils.searchInput(userBalance, item.payment.email) ||
                searchUtils.searchInput(userBalance, item.payment.rule) ||
                searchUtils.searchInput(userBalance, item.rank)
            );
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            actions.setData({
                ...state.set,
                searchValues: {
                    ...state.set.searchValues,
                    [name]: value,
                },
            })
        );
    };
    const changeSearch = (e) => {
        return searchUtils.logicSearch(e, dispatch, state, actions);
    };
    const handleSend = async () => {
        try {
            await 1;
            SVtotal({
                state,
                dispatch,
                actions,
                fromDate: dateFrom || new Date().toISOString(),
                toDate: dateTo || new Date().toISOString(),
            });
        } catch (err) {
            console.log(err);
        }
    };
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
    function RenderBodyTableUser({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index} style={{ fontSize: '14px' }}>
                            <td className='upc'>
                                {handleUtils.indexTable(page, show, index)}
                            </td>
                            <td>{item.payment.username}</td>
                            <td style={{ textAlign: 'left' }}>
                                {item.payment.email}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                {numberUtils.formatUSD(item.Wallet.balance)}
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                <span
                                    className={`${
                                        item.payment.rule + 'bgc'
                                    } status`}
                                >
                                    {item.payment.rule}
                                </span>
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                <TrStatus
                                    item={
                                        item.rank.charAt(0).toUpperCase() +
                                        item.rank.slice(1).toLowerCase()
                                    }
                                />
                            </td>
                        </tr>
                    );
                })}
            </>
        );
    }
    return (
        <div className={`${cx('dashboard-container')}`}>
            <div className={`${cx('general-top')}`}>
                <div className={`${cx('search-container')}`}>
                    <div className={`${cx('search-title')}`}>Từ ngày</div>
                    <SearchDate
                        name='dateFrom'
                        value={
                            dateFrom ? dateFrom : dateUtils.dateVn(new Date())
                        }
                        onChange={handleChange}
                        className={`${cx('search')}`}
                    />
                </div>
                <div className={`${cx('search-container')}`}>
                    <div className={`${cx('search-title')}`}>Đến ngày</div>
                    <SearchDate
                        name='dateTo'
                        value={
                            dateTo
                                ? dateTo
                                : dateUtils.dateVn(
                                      new Date(
                                          new Date().getTime() +
                                              3 * 24 * 60 * 60 * 1000
                                      )
                                  )
                        }
                        onChange={handleChange}
                        className={`${cx('search')}`}
                    />
                </div>
                <div className='flex-center'>
                    <Button
                        className={`${cx('general-button')} completebgc`}
                        onClick={handleSend}
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
                        value={numberUtils.formatUSD(100000)}
                    />
                </div>
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
        </div>
    );
}

export default Dashboard;

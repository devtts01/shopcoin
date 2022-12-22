/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { General } from '../../Layouts';
import styles from './SellHistoryUser.module.css';
import {
    axiosUtils,
    DataSellHistoryUser,
    handleUtils,
    numberUtils,
    textUtils,
    useAppContext,
} from '../../utils';
import moment from 'moment';
import { searchHistorySellCoins } from '../../services/coins';

const cx = className.bind(styles);

export default function SellHistoryUser() {
    const { state } = useAppContext();
    const {
        currentUser,
        searchValues: { sellHistory },
        pagination: { page, show },
    } = state.set;
    const [data, setData] = React.useState([]);
    const getDataBuyHistory = async () => {
        const resGet = await axiosUtils.userGet(
            `/getAllSell/${currentUser?.id}`
        );
        setData(resGet.data);
    };
    useEffect(() => {
        getDataBuyHistory();
        document.title = `Sell History | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const dataSettingFlag = searchHistorySellCoins({
        sellHistory,
        data: data,
    });
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td className='item-w150'>
                                {item?.symbol.replace('USDT', '')}
                            </td>
                            <td className='vip item-w150'>{item?.amount}</td>
                            <td className='item-w150'>---</td>
                            <td className='complete item-w150'>
                                {'~ ' +
                                    numberUtils
                                        .coinUSD(item?.amountUsd)
                                        .replace('USD', '')}
                            </td>
                            <td className='item-w100'>
                                {moment(item?.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </td>
                            <td className='flex-center'>
                                <span
                                    className={`status ${
                                        item?.status?.toLowerCase() + 'bgc'
                                    }`}
                                >
                                    {textUtils.FirstUpc(item?.status)}
                                </span>
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
                className={cx('setting-coin')}
                valueSearch={sellHistory}
                nameSearch='sellHistory'
                dataFlag={dataSettingFlag}
                dataHeaders={DataSellHistoryUser().headers}
                totalData={10}
                classNameButton='completebgc'
                isRefreshPage
                noActions
            >
                <RenderBodyTable data={dataSettingFlag} />
            </General>
        </>
    );
}

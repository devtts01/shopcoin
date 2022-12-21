/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './SellHistoryUser.module.css';
import {
    axiosUtils,
    DataSellHistoryUser,
    handleUtils,
    numberUtils,
    textUtils,
    useAppContext,
} from '../../utils';
import { General } from '../../Layouts';
import { searchHistorySellCoins } from '../../services/coins';
import moment from 'moment';

const cx = className.bind(styles);

export default function SellHistoryUser() {
    const { state } = useAppContext();
    const {
        currentUser,
        searchValues: { sellHistory },
        pagination: { page, show },
    } = state.set;
    const [data, setData] = useState(null);
    const getDataBuyHistory = async () => {
        const resGet = await axiosUtils.userGet(
            `/getAllSell/${currentUser?.id}`
        );
        setData(resGet.data);
    };
    useEffect(() => {
        getDataBuyHistory();
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
                            <td>{item?.symbol.replace('USDT', '')}</td>
                            <td className='vip'>{item?.amount}</td>
                            <td className='complete'>
                                {'~ ' +
                                    numberUtils
                                        .coinUSD(item?.amountUsd)
                                        .replace('USD', '')}
                            </td>
                            <td>
                                {moment(item?.createdAt).format('DD/MM/YYYY')}
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

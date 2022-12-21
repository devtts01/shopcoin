/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './BuyHistoryUser.module.css';
import {
    axiosUtils,
    DataBuyHistoryUser,
    handleUtils,
    numberUtils,
    textUtils,
    useAppContext,
} from '../../utils';
import { General } from '../../Layouts';
import { searchHistoryBuyCoins } from '../../services/coins';
import moment from 'moment';

const cx = className.bind(styles);

export default function BuyHistoryUser() {
    const { state } = useAppContext();
    const {
        currentUser,
        searchValues: { buyHistory },
        pagination: { page, show },
    } = state.set;
    const [data, setData] = useState(null);
    const getDataBuyHistory = async () => {
        const resGet = await axiosUtils.userGet(
            `/getAllBuy/${currentUser?.id}`
        );
        setData(resGet.data);
    };
    useEffect(() => {
        getDataBuyHistory();
    }, []);
    const dataSettingFlag = searchHistoryBuyCoins({
        buyHistory,
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
                valueSearch={buyHistory}
                nameSearch='buyHistory'
                dataFlag={dataSettingFlag}
                dataHeaders={DataBuyHistoryUser().headers}
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

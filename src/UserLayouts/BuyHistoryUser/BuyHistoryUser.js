/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import { General } from '../../Layouts';
import styles from './BuyHistoryUser.module.css';
import {
    axiosUtils,
    DataBuyHistoryUser,
    handleUtils,
    numberUtils,
    textUtils,
    useAppContext,
} from '../../utils';
import moment from 'moment';
import { searchHistoryBuyCoins } from '../../services/coins';

const cx = className.bind(styles);

export default function BuyHistoryUser() {
    const { state } = useAppContext();
    const {
        currentUser,
        searchValues: { buyHistory },
        pagination: { page, show },
    } = state.set;
    const [data, setData] = React.useState([]);
    const getDataBuyHistory = async () => {
        const resGet = await axiosUtils.userGet(
            `/getAllDepositsByEmail/${currentUser?.email}`
        );
        setData(resGet.data);
    };
    useEffect(() => {
        getDataBuyHistory();
        document.title = `Buy History | ${process.env.REACT_APP_TITLE_WEB}`;
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
                            <td className='item-w150'>
                                {item?.symbol.replace('USDT', '')}
                            </td>
                            <td className='vip item-w150'>{item?.amountUsd}</td>
                            <td className='item-w150'>---</td>
                            <td className='complete item-w150'>
                                {'~ ' + numberUtils.formatVND(item?.amountVnd)}
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

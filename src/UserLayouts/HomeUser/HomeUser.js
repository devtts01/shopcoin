/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './HomeUser.module.css';
import {
    DataCoinsUser,
    handleUtils,
    useAppContext,
    useDebounce,
} from '../../utils';
import { actions } from '../../app/';
import { getCoins, searchCoins } from '../../services/coins';
import { General } from '../../Layouts';
import { TrObjectImage } from '../../components/TableData/TableData';
import moment from 'moment';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function RenderBodyTable({ data }) {
    const { state } = useAppContext();
    const {
        pagination: { page, show },
    } = state.set;
    return (
        <>
            {data.map((item, index) => {
                return (
                    <tr key={item?._id}>
                        <td>{handleUtils.indexTable(page, show, index)}</td>
                        <td>
                            <TrObjectImage
                                item={`${
                                    process.env.REACT_APP_URL_SERVER
                                }${item.logo?.replace('uploads/', '')}`}
                            />
                        </td>
                        <td className='item-w150'>
                            {item?.name}{' '}
                            <span className='confirm'>({item?.price})</span>
                        </td>
                        <td className='complete item-w150'>{item?.high}</td>
                        <td className='cancel item-w150'>{item?.low}</td>
                        <td className='item-w100'>
                            {moment(item?.createdAt).format(
                                'DD/MM/YYYY HH:mm:ss'
                            )}
                        </td>
                        <td>
                            <Link
                                to={`${item?._id}`}
                                className={`${cx('actions-item')} completebgc`}
                            >
                                Buy
                            </Link>
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

export default function HomeUser() {
    const { state, dispatch } = useAppContext();
    const {
        searchValues: { settingCoin },
        pagination: { page, show },
        data: { dataSettingCoin },
    } = state.set;
    useEffect(() => {
        document.title = `Home | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const useDebounceCoin = useDebounce(settingCoin, 500);
    useEffect(() => {
        getCoins({
            dispatch,
            state,
            actions,
            page,
            show,
            search: useDebounceCoin,
        });
    }, [page, show, useDebounceCoin]);
    const dataSettingFlag =
        dataSettingCoin?.data?.coins || dataSettingCoin?.data;
    return (
        <>
            <General
                className={cx('setting-coin')}
                valueSearch={settingCoin}
                nameSearch='settingCoin'
                dataFlag={dataSettingFlag}
                dataHeaders={DataCoinsUser().headers}
                totalData={
                    dataSettingCoin?.total || dataSettingCoin?.data?.total
                }
                classNameButton='completebgc'
                isRefreshPage
            >
                <RenderBodyTable data={dataSettingFlag} />
            </General>
        </>
    );
}
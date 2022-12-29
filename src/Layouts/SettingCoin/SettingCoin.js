/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import {
    getCoins,
    onClickEdit,
    handleDelete,
    checkErrorCoins,
    handleCreateCoinInactive,
} from '../../services/coins';
import {
    useAppContext,
    DataCoins,
    deleteUtils,
    requestRefreshToken,
    handleUtils,
    useDebounce,
} from '../../utils';
import { ActionsTable, Modal } from '../../components';
import styles from './SettingCoin.module.css';
import { TrObjectImage } from '../../components/TableData/TableData';

const cx = className.bind(styles);

function SettingCoin() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        searchValues: { settingCoin },
        pagination: { page, show },
        data: { dataSettingCoin, dataCoinInactive },
    } = state.set;
    const { modalDelete } = state.toggle;
    const history = useNavigate();
    useEffect(() => {
        document.title = `Coins | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    const useDebounceCoin = useDebounce(settingCoin, 500);
    useEffect(() => {
        if (useDebounceCoin) {
            setTimeout(() => {
                dispatch(
                    actions.setData({
                        pagination: { page: 1, show: 10 },
                    })
                );
            }, 500);
        }
    }, [useDebounceCoin]);
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
    // Modal Delete
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    // Edit + Delete Coin
    const handleDeleteCoins = async (data, id) => {
        await handleDelete({
            data,
            id,
            dispatch,
            state,
            actions,
            page,
            show,
            search: settingCoin,
        });
    };
    const deleteCoins = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeleteCoins,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorCoins({ err, dispatch, state, actions });
        }
    };
    const editSetting = async (item) => {
        onClickEdit({ dispatch, state, actions, item });
    };
    const handleBlock = (data, item) => {
        handleCreateCoinInactive({
            data,
            dispatch,
            state,
            actions,
            nameCoin: item?.name,
            symbolCoin: item?.symbol,
            fullName: item?.fullName,
            logo_sub: item?.logo,
            history,
            page,
            show,
        });
    };
    const onClickBlock = async (item) => {
        try {
            const check = dataCoinInactive?.data?.find(
                (itemCoin) => itemCoin.symbol === item.symbol
            );
            if (check) {
                dispatch(
                    actions.setData({
                        message: {
                            error: 'Coins are locked!',
                        },
                    })
                );
                dispatch(actions.toggleModal({ alertModal: true }));
            } else {
                requestRefreshToken(
                    currentUser,
                    handleBlock,
                    state,
                    dispatch,
                    actions,
                    item
                );
            }
        } catch (err) {
            checkErrorCoins({ err, dispatch, state, actions });
        }
    };
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td>
                                <TrObjectImage
                                    item={`${
                                        process.env.REACT_APP_URL_SERVER
                                    }${item.logo?.replace('uploads/', '')}`}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                {moment(item.createdAt).format(
                                    'DD/MM/YYYY HH:mm:ss'
                                )}
                            </td>
                            <td>
                                <ActionsTable
                                    edit
                                    block
                                    linkView={`${routers.settingCoin}/${item._id}`}
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickEdit={() => editSetting(item)}
                                    onClickBlock={() => onClickBlock(item)}
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
                className={cx('setting-coin')}
                valueSearch={settingCoin}
                nameSearch='settingCoin'
                textBtnNew='New Coin'
                linkCreate={`${routers.settingCoin}/${routers.newcoin}`}
                dataFlag={dataSettingFlag}
                dataHeaders={DataCoins().headers}
                totalData={
                    dataSettingCoin?.total || dataSettingCoin?.data?.totalSearch
                }
                classNameButton='completebgc'
            >
                <RenderBodyTable data={dataSettingFlag} />
            </General>
            {modalDelete && (
                <Modal
                    titleHeader='Delete Setting Coin'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton='cancelbgc'
                    onClick={() => deleteCoins(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this coin?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default SettingCoin;

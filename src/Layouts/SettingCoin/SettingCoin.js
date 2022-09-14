/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import {
    getCoins,
    searchCoins,
    onClickEdit,
    handleDelete,
    checkErrorCoins,
} from '../../services/coins';
import {
    useAppContext,
    DataCoins,
    deleteUtils,
    requestRefreshToken,
    handleUtils,
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
        data: { dataSettingCoin },
    } = state.set;
    const { modalDelete } = state.toggle;
    useEffect(() => {
        document.title = 'Coins | Shop Coin';
    }, []);
    useEffect(() => {
        getCoins({ dispatch, state, actions, page, show });
    }, [page, show]);
    const dataSettingFlag = searchCoins({
        settingCoin,
        dataSettingCoin: dataSettingCoin.data,
    });
    // Modal Delete
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };
    // Edit + Delete Coin
    const handleDeleteCoins = async (data, id) => {
        await handleDelete({ data, id, dispatch, state, actions });
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
                                    }${item.logo.replace('uploads/', '')}`}
                                />
                            </td>
                            <td>{item.name}</td>
                            <td>
                                {moment(item.createAt).format('DD/MM/YYYY')}
                            </td>
                            <td>
                                <ActionsTable
                                    edit
                                    linkView={`${routers.settingCoin}/${routers.editCoin}/${item._id}`}
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickEdit={() => editSetting(item)}
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
                totalData={dataSettingCoin.total || 10}
            >
                <RenderBodyTable data={dataSettingFlag} />
            </General>
            {modalDelete && (
                <Modal
                    titleHeader='Delete Setting Coin'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton={`${cx('delete-button')}`}
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

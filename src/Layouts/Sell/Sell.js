/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import {
    getSells,
    searchSells,
    handleUpdateStatusFeeSell,
    checkErrorSells,
    handleDelete,
} from '../../services/sell';
import {
    useAppContext,
    DataSells,
    deleteUtils,
    handleUtils,
    requestRefreshToken,
} from '../../utils';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import moment from 'moment';
import { Icons, ActionsTable, SelectStatus, Modal } from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import {
    TrObjectIcon,
    TrObjectNoIcon,
    TrStatus,
    // TrObjectImage,
} from '../../components/TableData/TableData';
import styles from './Sell.module.css';

const cx = className.bind(styles);
const DATA_SELL = DataSells(Icons);

function Sell() {
    const { state, dispatch } = useAppContext();
    const { headers } = DATA_SELL;
    const {
        edit,
        currentUser,
        statusUpdate,
        statusCurrent,
        data: { dataSell, dataUser },
        pagination: { page, show },
        searchValues: { sell },
    } = state.set;
    const { modalStatus, modalDelete } = state.toggle;
    useEffect(() => {
        document.title = 'Sell | Shop Coin';
        getSells({ page, show, dispatch, state, actions });
    }, []);
    let dataSellFlag = searchSells({ dataSell, sell });
    const toggleEditTrue = (e, status, id) => {
        return deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
    };
    const toggleEditFalse = (e) => {
        return deleteUtils.statusFalse(e, dispatch, state, actions);
    };
    const modalDeleteTrue = (e, id) => {
        return deleteUtils.deleteTrue(e, id, dispatch, state, actions);
    };
    const modalDeleteFalse = (e) => {
        return deleteUtils.deleteFalse(e, dispatch, state, actions);
    };

    // EDIT + DELETE
    const handleEdit = async (data, id) => {
        await handleUpdateStatusFeeSell({
            data,
            id,
            dispatch,
            state,
            actions,
            page,
            show,
            statusUpdate,
            statusCurrent,
        });
    };
    const editStatusSell = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleEdit,
                state,
                dispatch,
                actions,
                id
            );
            dispatch(
                actions.toggleModal({
                    ...state.toggle,
                    modalStatus: false,
                })
            );
            dispatch(
                actions.setData({
                    ...state.set,
                    statusUpdate: '',
                    statusCurrent: '',
                })
            );
        } catch (err) {
            checkErrorSells({ err, dispatch, state, actions });
        }
    };
    const handleDeleteSell = async (data, id) => {
        await handleDelete({ data, id, dispatch, state, actions, page, show });
    };
    const deleteSell = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeleteSell,
                state,
                dispatch,
                actions,
                id
            );
            dispatch(
                actions.toggleModal({
                    ...state.toggle,
                    modalDelete: false,
                    alertModal: true,
                })
            );
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } catch (err) {
            checkErrorSells({ err, dispatch, state, actions });
        }
    };
    const handleViewSell = (item) => {
        dispatch(
            actions.setData({
                ...state.set,
                edit: { ...state.set.edit, id: item.id, itemData: item },
            })
        );
    };
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => {
                    const sendReceived = {
                        send: {
                            icon: <Icons.SendIcon />,
                            title: 'Send',
                            number: '100,039.38',
                        },
                        received: {
                            icon: <Icons.ReceivedIcon />,
                            title: 'Received',
                            number: '10,482.46',
                        },
                    };
                    const username = dataUser.dataUser.find(
                        (x) => x.payment.email === item.buyer.gmailUSer
                    ).payment.username;
                    const infoUser = {
                        name: username,
                        email: item.buyer.gmailUSer,
                        path: `@${username.replace(' ', '-')}`,
                    };
                    return (
                        <tr key={index}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td>
                                <Skeleton width={50} />
                            </td>
                            <td>
                                <TrObjectIcon item={sendReceived} />
                            </td>
                            <td>
                                <TrObjectNoIcon item={infoUser} />
                            </td>
                            <td>
                                {moment(item.createAt).format('DD/MM/YYYY')}
                            </td>
                            <td>
                                <TrStatus
                                    item={item.status}
                                    onClick={(e) =>
                                        toggleEditTrue(e, item.status, item._id)
                                    }
                                />
                            </td>
                            <td>
                                <ActionsTable
                                    view
                                    linkView={`${routers.sell}/${routers.sellDetail}/${item._id}`}
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickView={() => handleViewSell(item)}
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
                className={cx('sell')}
                valueSearch={sell}
                nameSearch='sell'
                dataFlag={dataSellFlag}
                dataHeaders={headers}
                titleDelModal='Delete Sell'
                textDelModal='Are you sure to delete this sell?'
                typeDataDel={dataSell}
                nameTypeDataDel='dataSell'
                totalData={dataSellFlag && dataSellFlag.length}
            >
                <RenderBodyTable data={dataSellFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Change Status'
                    actionButtonText='Submit'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    onClick={() => editStatusSell(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure change status this{' '}
                        {window.location.pathname.includes(`${routers.buy}`)
                            ? 'buy'
                            : 'sell'}
                        ?
                    </p>
                    <SelectStatus />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Delete Sell'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton={`${cx('delete-button')}`}
                    onClick={() => deleteSell(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this sell?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default Sell;

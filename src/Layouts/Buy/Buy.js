/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import className from 'classnames/bind';
import {
    getBuys,
    searchBuys,
    handleUpdateStatusFeeBuy,
    checkErrorBuys,
    handleDelete,
} from '../../services/buy';
import {
    useAppContext,
    DataBuys,
    deleteUtils,
    handleUtils,
    requestRefreshToken,
} from '../../utils';
import { Icons, ActionsTable, Modal, SelectStatus } from '../../components';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import {
    TrObjectIcon,
    TrObjectNoIcon,
    TrStatus,
} from '../../components/TableData/TableData';
import styles from './Buy.module.css';

const cx = className.bind(styles);

function Buy() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        statusCurrent,
        statusUpdate,
        data: { dataBuy, dataUser },
        pagination: { page, show },
        searchValues: { buy },
    } = state.set;
    const { modalStatus, modalDelete } = state.toggle;
    useEffect(() => {
        document.title = 'Buy | Shop Coin';
    }, []);
    useEffect(() => {
        getBuys({ page, show, dispatch, state, actions });
    }, [page, show]);
    let dataBuyFlag = searchBuys({ dataBuy, buy });
    const toggleEditStatusTrue = (e, status, id) => {
        return deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
    };
    const toggleEditStatusFalse = (e) => {
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
        await handleUpdateStatusFeeBuy({
            data,
            id,
            dispatch,
            state,
            actions,
            statusUpdate,
            statusCurrent,
            page,
            show,
        });
    };
    const editStatusBuy = async (id) => {
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
            checkErrorBuys({ err, dispatch, state, actions });
        }
    };
    const handleDeleteBuy = async (data, id) => {
        await handleDelete({ data, id, dispatch, state, actions, page, show });
    };
    const deleteBuy = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeleteBuy,
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
            checkErrorBuys({ err, dispatch, state, actions });
        }
    };
    const handleViewBuy = (item) => {
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
                                        toggleEditStatusTrue(
                                            e,
                                            item.status,
                                            item._id
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <ActionsTable
                                    view
                                    linkView={`${routers.buy}/${routers.buyDetail}/${item._id}`}
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickView={() => handleViewBuy(item)}
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
                className={cx('buy')}
                valueSearch={buy}
                nameSearch='buy'
                dataFlag={dataBuyFlag}
                dataHeaders={DataBuys(Icons).headers}
                totalData={dataBuyFlag && dataBuyFlag.length}
            >
                <RenderBodyTable data={dataBuyFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Change Status'
                    actionButtonText='Submit'
                    openModal={toggleEditStatusTrue}
                    closeModal={toggleEditStatusFalse}
                    onClick={() => editStatusBuy(edit.id)}
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
                    titleHeader='Delete Setting Coin'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton='delete-button'
                    onClick={() => deleteBuy(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this coin?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default Buy;

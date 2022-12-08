/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import className from 'classnames/bind';
import moment from 'moment';
import {
    getDeposits,
    searchDeposits,
    handleEdit,
    checkErrorDeposits,
    handleDelete,
} from '../../services/deposits';
import {
    useAppContext,
    DataDeposits,
    deleteUtils,
    handleUtils,
    requestRefreshToken,
    localStoreUtils,
    numberUtils,
} from '../../utils';
import { Icons, ActionsTable, Modal, SelectStatus } from '../../components';
import { actions } from '../../app/';
import routers from '../../routers/routers';
import { General } from '../';
import {
    TrObjectIcon,
    TrObjectNoIcon,
    TrStatus,
} from '../../components/TableData/TableData';
import styles from './Deposits.module.css';

const cx = className.bind(styles);

function Deposits() {
    const { state, dispatch } = useAppContext();
    const {
        edit,
        currentUser,
        statusUpdate,
        statusCurrent,
        searchValues: { deposits },
        pagination: { page, show },
        data: { dataDeposits, dataUser },
    } = state.set;

    const { modalStatus, modalDelete } = state.toggle;
    const [isProcess, setIsProcess] = useState(false);
    useEffect(() => {
        document.title = `Deposits | ${process.env.REACT_APP_TITLE_WEB}`;
    }, []);
    useEffect(() => {
        getDeposits({ page, show, dispatch, state, actions });
    }, [page, show]);
    let dataDepositsFlag = searchDeposits({
        deposits,
        dataDeposits: dataDeposits.data,
    });
    // Modal
    const toggleEditTrue = async (e, status, id) => {
        await localStoreUtils.setStore({
            ...currentUser,
            idUpdate: id,
        });
        deleteUtils.statusTrue(e, status, id, dispatch, state, actions);
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
    // Edit + Delete Deposits
    const handleDeleteDeposits = async (data, id) => {
        handleDelete({ data, id, dispatch, state, actions, page, show });
    };
    const deleteDeposits = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeleteDeposits,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorDeposits({ err, dispatch, state, actions });
        }
    };
    const handleEditStatus = async (data, id) => {
        await handleEdit({
            data,
            id,
            dispatch,
            actions,
            state,
            statusCurrent,
            statusUpdate,
            page,
            show,
        });
    };
    const editStatus = async (id) => {
        try {
            await 1;
            setIsProcess(true);
            setTimeout(() => {
                requestRefreshToken(
                    currentUser,
                    handleEditStatus,
                    state,
                    dispatch,
                    actions,
                    id
                );
                setIsProcess(false);
            }, 1000);
        } catch (err) {
            checkErrorDeposits({ err, dispatch, state, actions });
        }
    };
    const handleViewDeposits = (item) => {
        dispatch(
            actions.setData({
                ...state.set,
                edit: {
                    ...state.set.edit,
                    id: item._id || item.id,
                    itemData: item,
                },
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
                            number: numberUtils.formatVND(item?.amountVnd),
                        },
                        received: {
                            icon: <Icons.ReceivedIcon />,
                            title: 'Received',
                            number: numberUtils.formatUSD(item?.amount),
                        },
                    };
                    const username = dataUser.dataUser.find(
                        (x) => x?.payment.email === item.user
                    )?.payment.username;
                    const infoUser = {
                        name: username,
                        email: item.user,
                        path: `@${username?.replace(' ', '-')}`,
                    };
                    return (
                        <tr key={index}>
                            <td>{handleUtils.indexTable(page, show, index)}</td>
                            <td>{item.code}</td>
                            <td>
                                <TrObjectIcon item={sendReceived} />
                            </td>
                            <td>
                                <TrObjectNoIcon item={infoUser} />
                            </td>
                            <td>
                                {moment(item.createdAt).format('DD/MM/YYYY')}
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
                                    linkView={`${routers.deposits}/${routers.depositsDetail}/${item._id}`}
                                    onClickDel={(e) =>
                                        modalDeleteTrue(e, item._id)
                                    }
                                    onClickView={() => handleViewDeposits(item)}
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
                className={cx('deposits')}
                valueSearch={deposits}
                nameSearch='deposits'
                dataFlag={dataDepositsFlag}
                dataHeaders={DataDeposits(Icons).headers}
                totalData={dataDeposits.total}
            >
                <RenderBodyTable data={dataDepositsFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Change Status'
                    actionButtonText='Submit'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    classNameButton='vipbgc'
                    onClick={() => editStatus(currentUser?.idUpdate || edit.id)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Are you sure change status this{' '}
                        {window.location.pathname.includes(
                            `${routers.deposits}`
                        )
                            ? 'deposits'
                            : 'widthdraw'}
                        ?
                    </p>
                    <SelectStatus />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Delete Deposits'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton='cancelbgc'
                    onClick={() => deleteDeposits(edit.id)}
                    isProcess={isProcess}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this deposits?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default Deposits;

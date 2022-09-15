/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import className from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    useAppContext,
    DataUsers,
    deleteUtils,
    handleUtils,
} from '../../utils';
import { TrStatus } from '../../components/TableData/TableData';
import { requestRefreshToken } from '../../utils';
import routers from '../../routers/routers';
import { actions } from '../../app/';
import { General } from '../';
import { Modal, ActionsTable, SelectStatus } from '../../components';
import {
    getUsers,
    searchUsers,
    handleDelete,
    checkErrorUsers,
    handleUpdateRankFeeUser
} from '../../services/users';
import styles from './User.module.css';

const cx = className.bind(styles);
const DATA_USERS = DataUsers();

function User() {
    const { state, dispatch } = useAppContext();
    const { headers } = DATA_USERS;
    const {
        edit,
        currentUser,
        statusUpdate, statusCurrent,
        data: { dataUser },
        pagination: { page, show },
        searchValues: { user },
    } = state.set;
    const { modalDelete, modalStatus } = state.toggle;
    useEffect(() => {
        document.title = 'User | Shop Coin';
    }, []);
    useEffect(() => {
        getUsers({ page, show, dispatch, state, actions });
    }, [page, show]);
    //Search Data Users
    let dataUserFlag = searchUsers({ dataUser: dataUser.dataUser, user });
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
    const handleViewUser = (item) => {
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
    // Delete User + Update Status User
    const handleDeleteUser = async (data, id) => {
        handleDelete({ data, id, dispatch, state, actions, page, show });
    };
    const deleteUser = async (id) => {
        try {
            requestRefreshToken(
                currentUser,
                handleDeleteUser,
                state,
                dispatch,
                actions,
                id
            );
        } catch (err) {
            checkErrorUsers({ err, dispatch, state, actions });
        }
    };
    const handleEditRank = async (data,id) => {
        handleUpdateRankFeeUser({ data, id, dispatch, state, actions, page, show, statusUpdate, statusCurrent });
    }
    const editStatus = async (id) => {
        try{
            requestRefreshToken(
                currentUser,
                handleEditRank,
                state,
                dispatch,
                actions,
                id
            );
        }
        catch(err){
            checkErrorUsers({ err, dispatch, state, actions });
        }
    }
    function RenderBodyTable({ data }) {
        return (
            <>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td className='upc'>
                            {handleUtils.indexTable(page, show, index)}
                        </td>
                        <td>
                            {item.payment.username || <Skeleton with={50} />}
                        </td>
                        <td>{item.payment.email || <Skeleton with={50} />}</td>
                        <td>
                            {item.payment.bank.bankName || (
                                <Skeleton with={50} />
                            )}
                        </td>
                        <td>{item.payment.rule || <Skeleton with={50} />}</td>
                        <td>
                            <TrStatus
                                item={item.rank.charAt(0).toUpperCase() + item.rank.slice(1).toLowerCase()}
                                onClick={(e) =>
                                    toggleEditTrue(e, item.rank, item._id)
                                }
                            />
                        </td>
                        <td>
                            <ActionsTable
                                view
                                linkView={`${routers.user}/${item._id}`}
                                onClickView={() => handleViewUser(item)}
                                onClickDel={(e) => modalDeleteTrue(e, item._id)}
                            ></ActionsTable>
                        </td>
                    </tr>
                ))}
            </>
        );
    }
    return (
        <>
            <General
                className={cx('user')}
                valueSearch={user}
                nameSearch='user'
                dataFlag={dataUserFlag}
                dataHeaders={headers}
                totalData={dataUser.total}
            >
                <RenderBodyTable data={dataUserFlag} />
            </General>
            {modalStatus && (
                <Modal
                    titleHeader='Change Rank'
                    actionButtonText='Submit'
                    openModal={toggleEditTrue}
                    closeModal={toggleEditFalse}
                    onClick={() => editStatus(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure change rank this user?
                    </p>
                    <SelectStatus rank />
                </Modal>
            )}
            {modalDelete && (
                <Modal
                    titleHeader='Delete User'
                    actionButtonText='Delete'
                    openModal={modalDeleteTrue}
                    closeModal={modalDeleteFalse}
                    classNameButton={`${cx('delete-button')}`}
                    onClick={() => deleteUser(edit.id)}
                >
                    <p className='modal-delete-desc'>
                        Are you sure to delete this user?
                    </p>
                </Modal>
            )}
        </>
    );
}

export default User;

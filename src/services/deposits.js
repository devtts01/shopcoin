import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
    validates,
} from '../utils';

// GET DATA DEPOSITS
export const getDeposits = async (props = {}) => {
    const processDeposits = await axiosUtils.adminGet(
        `/getAllDeposit?page=${props.page}&show=${props.show}`
    );
    const processUser = await axiosUtils.adminGet('/getAllUsers');
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataDeposits: processDeposits,
                dataUser: processUser,
            },
        })
    );
};
// GET DEPOSITS/WITHDRAWS BY ID
export const getDepositsWithdrawById = async (props = {}) => {
    if (props.idDeposits || props.idWithdraw) {
        const processUser = await axiosUtils.adminGet('/getAllUsers');
        const process = await axiosUtils.adminGet(
            props.idDeposits
                ? `/getDeposit/${props.idDeposits}`
                : `/getWithdraw/${props.idWithdraw}`
        );
        const { data } = process;
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                edit: {
                    ...props.state.set.edit,
                    itemData: data,
                },
                data: {
                    ...props.state.set.data,
                    dataUser: processUser,
                },
            })
        );
    }
};
// CHECK ERROR ACTIONS
export const checkErrorDeposits = (props = {}) => {
    return props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                error: props.err?.response?.data,
            },
        })
    );
};
// SEARCH DEPOSITS
export const searchDeposits = (props = {}) => {
    let dataDepositsFlag = props.dataDeposits; //.dataDeposit
    if (props.deposits) {
        dataDepositsFlag = dataDepositsFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.deposits, item._id) ||
                searchUtils.searchInput(props.deposits, item.code) ||
                searchUtils.searchInput(props.deposits, item.user) ||
                searchUtils.searchInput(props.deposits, item?.amountVnd) ||
                searchUtils.searchInput(props.deposits, item?.amountUsd) ||
                searchUtils.searchInput(props.deposits, item?.createdAt) ||
                searchUtils.searchInput(props.deposits, item?.createBy) ||
                searchUtils.searchInput(props.deposits, item.status)
            );
        });
    }
    return dataDepositsFlag;
};
// HANDLE EDIT DEPOSITS
export const handleEdit = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/handleBuyUSD/${props.id}`, {
        status: props.statusUpdate || props.statusCurrent,
        note: props.note,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllDeposit?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataDeposits',
                resPut.message
            );
            return props.data;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
};
// HANDLE DELETE DEPOSITS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`/deleteDeposit/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `/getAllDeposit?page=${props.page}&show=${props.show}`
    );
    dispatchDelete(
        props.dispatch,
        props.state,
        props.actions,
        res,
        'dataDeposits',
        resDel.message
    );
};
// HANDLE CREATE DEPOSIT
export const handleCreate = async (props = {}) => {
    const resPost = await axiosUtils.userPost(`/BuyUSD/${props?.id}`, {
        amountUSD: props?.amount,
        user: props?.id,
        amountVnd: props.amountVnd,
        bankAdmin: props?.bankAdmin,
        token: props?.token,
    });
    switch (resPost.code) {
        case 0:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resPost?.message
                            ? resPost?.message
                            : 'Buy successfully',
                        error: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                    selectBank: false,
                })
            );
            break;
        case 1:
        case 2:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: `You don't have a payment account yet, please create one before doing so. Profile → Profile Payment. Thank you!`,
                        cre: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                    selectBank: false,
                })
            );
            break;
        default:
            break;
    }
};

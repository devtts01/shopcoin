import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
    validates,
} from '../utils';

// GET DATA WITHDRAWS
export const getWithdraws = async (props = {}) => {
    const processWithdraws = await axiosUtils.adminGet(
        `/getAllWithdraw?page=${props.page}&show=${props.show}`
    );
    const processUser = await axiosUtils.adminGet('/getAllUsers');
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataWithdraw: processWithdraws,
                dataUser: processUser,
            },
        })
    );
};
// CHECK ERROR ACTIONS
export const checkErrorWithdraw = (props = {}) => {
    return props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                error: props.err?.response?.data,
            },
        })
    );
};
// SEARCH WITHDRAWS
export const searchWithdraw = (props = {}) => {
    let dataWithdrawFlag = props.dataWithdraw;
    if (props.withdraw) {
        dataWithdrawFlag = dataWithdrawFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.withdraw, item._id) ||
                searchUtils.searchInput(props.withdraw, item.code) ||
                searchUtils.searchInput(props.withdraw, item.user) ||
                searchUtils.searchInput(props.withdraw, item?.amountUsd) ||
                searchUtils.searchInput(props.withdraw, item?.amountVnd) ||
                searchUtils.searchInput(props.withdraw, item?.createdAt) ||
                searchUtils.searchInput(props.withdraw, item?.createBy) ||
                searchUtils.searchInput(props.withdraw, item.status)
            );
        });
    }
    return dataWithdrawFlag;
};
// HANDLE EDIT WITHDRAWS
export const handleEdit = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/handleSellUSD/${props.id}`, {
        status: props.statusUpdate || props.statusCurrent,
        note: props.note,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllWithdraw?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataWithdraw',
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
// HANDLE DELETE WITHDRAWS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`/deleteWithdraw/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `/getAllWithdraw?page=${props.page}&show=${props.show}`
    );
    dispatchDelete(
        props.dispatch,
        props.state,
        props.actions,
        res,
        'dataWithdraw',
        resDel.message
    );
};
// HANDLE CREATE WITHDRAWS
export const handleCreate = async (props = {}) => {
    const resPost = await axiosUtils.userPost(`/SellUSD/${props?.id}`, {
        amountUSD: parseFloat(props?.amountUSD),
        amountVnd: parseFloat(props?.amountVnd),
        user: props?.id,
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
                            : 'Sell successfully',
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
                        error: resPost?.message
                            ? resPost?.message
                            : 'Sell failed',
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

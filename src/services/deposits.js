import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
} from '../utils';

// GET DATA DEPOSITS
export const getDeposits = async (props = {}) => {
    const processDeposits = await axiosUtils.adminGet(
        `getAllDeposit?page=${props.page}&show=${props.show}`
    );
    const processUser = await axiosUtils.adminGet('getAllUser');
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
        const processUser = await axiosUtils.adminGet('getAllUser');
        const process = await axiosUtils.adminGet(
            props.idDeposits
                ? `getDeposit/${props.idDeposits}`
                : `getWithdraw/${props.idWithdraw}`
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
                ...props.state.set.message,
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
                searchUtils.searchInput(props.deposits, item.status)
            );
        });
    }
    return dataDepositsFlag;
};
// HANDLE EDIT DEPOSITS
export const handleEdit = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`updateDeposit/${props.id}`, {
        status: props.statusUpdate || props.statusCurrent,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllDeposit?page=${props.page}&show=${props.show}`
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
        default:
            break;
    }
};
// HANDLE DELETE DEPOSITS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`deleteDeposit/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `getAllDeposit?page=${props.page}&show=${props.show}`
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

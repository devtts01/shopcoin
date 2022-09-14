import {
    axiosUtils,
    dispatchCreate,
    dispatchEdit,
    dispatchDelete,
    searchUtils,
    numberUtils,
} from '../utils';
// GET DATA PAYMENT
export const getPayments = async (props = {}) => {
    const processPayment = await axiosUtils.adminGet(
        `getAllPayments?page=${props.page}&show=${props.show}`
    );
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataPayment: processPayment,
            },
        })
    );
};
// CHECK VALIDITY OF PAYMENT
export const checkFormPayment = (props = {}) => {
    if (!props.accountName) {
        props.refAccountName.current.focus();
        return false;
    } else if (!props.bankName) {
        props.refBankName.current.focus();
        return false;
    } else if (!props.accountNumber) {
        props.refAccountNumber.current.focus();
        return false;
    }
    return true;
};
// CHECK ERROR ACTIONS
export const checkErrorPayment = (props = {}) => {
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
// SEARCH PAYMENT
export const searchPayment = (props = {}) => {
    let dataUserFlag = props.dataPayment;
    if (props.payment) {
        dataUserFlag = dataUserFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.payment, item.code) ||
                searchUtils.searchInput(props.payment, item.accountName) ||
                searchUtils.searchInput(props.payment, item.methodName) ||
                searchUtils.searchInput(props.payment, item.accountNumber) ||
                searchUtils.searchInput(
                    props.payment,
                    numberUtils.formatUSD(item.transform)
                )
            );
        });
    }
    return dataUserFlag;
};
// CREATE PAYMENT
export const handleCreate = async (props = {}) => {
    const resPost = await axiosUtils.adminPost('payment', {
        methodName: props.bankName,
        accountName: props.accountName,
        accountNumber: props.accountNumber,
        rateDeposit: props.rateDeposit || 0,
        rateWithdraw: props.rateWithdraw || 0,
        token: props.data?.token,
    });
    switch (resPost.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllPayments?page=${props.page}&show=${props.show}`
            );
            dispatchCreate(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataPayment',
                resPost.message
            );
            return props.data;
        case 1:
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    message: {
                        ...props.state.set.message,
                        error: resPost.message,
                    },
                })
            );
            break;
        default:
            break;
    }
};
// UPDATE PAYMENT
export const handleUpdate = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`updatePayment/${props.id}`, {
        method: props.bankName,
        accountName: props.accountName,
        idMethod: props.accountNumber,
        rateDeposit: props.rateDeposit,
        rateWithdraw: props.rateWithdraw,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllPayments?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataPayment',
                resPut.message
            );
            return props.data;
        default:
            break;
    }
};

// DELETE PAYMENT
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`deletePayment/${props.id}`, {
        headers: {
            token: props.data.token,
        },
    });
    switch (resDel.code) {
        case 0:
            const resPayment = await axiosUtils.adminGet(
                `getAllPayments?page=${props.page}&show=${props.show}`
            );
            dispatchDelete(
                props.dispatch,
                props.state,
                props.actions,
                resPayment,
                'dataPayment',
                resDel.message
            );
            return props.data;
        default:
            break;
    }
};

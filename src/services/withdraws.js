import routers from '../routers/routers';
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
    const processUser = await axiosUtils.adminGet('/getAllUser');
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
                searchUtils.searchInput(props.withdraw, item.status)
            );
        });
    }
    return dataWithdrawFlag;
};
// HANDLE EDIT WITHDRAWS
export const handleEdit = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/handleWithdraw/${props.id}`, {
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
    const resPost = await axiosUtils.userPost('/withdraw', {
        amountUsd: parseFloat(props?.amount),
        user: props?.email,
        rateWithdraw: props?.rateWithdraw,
        token: props?.token,
    });
    switch (resPost.code) {
        case 0:
            const resGet = await axiosUtils.userGet(
                `/getAllWithdraw/${props?.email}`
            );
            props.setData(resGet.data);
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resPost?.message
                            ? resPost?.message
                            : 'Create Withdraw successfully',
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
                            : 'Create Withdraw failed',
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
// HANDLE RESEND CODE
export const handleResendCode = async (props = {}) => {
    const resPost = await axiosUtils.userPost(
        `/resendOTPWithdraw/${props?.id}`,
        {
            email: props?.email,
            token: props?.token,
        }
    );
    switch (resPost.code) {
        case 0:
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resPost?.message
                            ? resPost?.message
                            : 'Resend code successfully',
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
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: resPost?.message
                            ? resPost?.message
                            : 'Resend code failed',
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
// HANDLE CHECK CODE WITHDRAW USER
export const handleCheckCodeWithdraw = async (props = {}) => {
    const resGet = await axiosUtils.userGet(
        `/enterOTPWithdraw/${props?.code}`,
        {
            code: props?.code,
            headers: {
                token: props?.token,
            },
        }
    );
    switch (resGet.code) {
        case 0:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resGet?.message
                            ? resGet?.message
                            : 'Verify code successfully',
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
            props.history(routers.withdrawUser);
            break;
        case 1:
        case 2:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: resGet?.message
                            ? resGet?.message
                            : 'Verify code failed',
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
// HANDLE CANCEL WITHDRAW
export const handleCancelWithdraw = async (props = {}) => {
    const resDel = await axiosUtils.userDelete(`/cancelWithdraw/${props.id}`);
    switch (resDel.code) {
        case 0:
            props.setIsProcessCancel(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resDel?.message
                            ? resDel?.message
                            : 'Cancel withdraw successfully',
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
            props.history(routers.withdrawUser);
            break;
        case 1:
        case 2:
            props.setIsProcessCancel(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: resDel?.message
                            ? resDel?.message
                            : 'Cancel withdraw failed',
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

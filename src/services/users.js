import {
    axiosUtils,
    searchUtils,
    dispatchDelete,
    dispatchEdit,
    validates,
} from '../utils';
// GET DATA USERS
export const getUsers = async (props = {}) => {
    const processUsers = await axiosUtils.adminGet(
        `/getAllUsers?page=${props.page}&show=${props.show}`
    );
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataUser: processUsers,
            },
        })
    );
};
// GET USER BY ID
export const getUserById = async (props = {}) => {
    if (props.idUser) {
        const process = await axiosUtils.adminGet(`/getUser/${props.idUser}`);
        const { data } = process;
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                edit: {
                    ...props.state.set.edit,
                    itemData: data,
                },
            })
        );
    }
};
// GET USER BY ROLE
export const getUserByRole = async (props = {}) => {
    const process = await axiosUtils.adminGet(
        `/getBankInfoByRole/${props.role}`
    );
    props.dispatch(
        props.actions.setData({
            adminRole: process,
        })
    );
};
// SEARCH DATA USERS
export const searchUsers = (props = {}) => {
    let dataUserFlag = props.dataUser;
    if (props.user) {
        dataUserFlag = dataUserFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.user, item.payment.username) ||
                searchUtils.searchInput(props.user, item.payment.email) ||
                searchUtils.searchInput(props.user, item.payment.rule) ||
                searchUtils.searchInput(props.user, item.rank)
            );
        });
    }
    return dataUserFlag;
};
// CHECK ERROR ACTIONS
export const checkErrorUsers = (props = {}) => {
    return props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                error: props.err?.response?.data,
            },
        })
    );
};
// EDIT RANK USER
export const handleUpdateRankFeeUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/updateRankUser/${props.id}`, {
        rank:
            props.statusUpdate.toUpperCase() ||
            props.statusCurrent.toUpperCase(),
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllUsers?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataUser',
                resPut.message
            );
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    data: {
                        ...props.state.set.data,
                        dataUser: res,
                    },
                    message: {
                        upd: resPut.message,
                    },
                })
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
// EDIT RULE USER
export const handleUpdateRuleUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/changeRoleUser/${props.id}`, {
        rule:
            props.statusUpdate.toUpperCase() ||
            props.statusCurrent.toUpperCase(),
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllUser?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataUser',
                resPut.message
            );
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    data: {
                        ...props.state.set.data,
                        dataUser: res,
                    },
                    message: {
                        upd: resPut.message,
                    },
                })
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
// DELETE USERS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`/deleteUser/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `/getAllUsers?page=${props.page}&show=${props.show}`
    );
    dispatchDelete(
        props.dispatch,
        props.state,
        props.actions,
        res,
        'dataUser',
        resDel.message
    );
};
// CHANG PASSWORD USER BY ID
export const changePasswordUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/changePWD/${props.id}`, {
        newPWD: props.password,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const process = await axiosUtils.adminGet(`/getUser/${props.id}`);
            const { data } = process;
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    edit: {
                        ...props.state.set.edit,
                        itemData: data,
                    },
                    message: {
                        upd: resPut.message,
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    ...props.state.toggle,
                    modalDelete: false,
                    modalStatus: false,
                    alertModal: true,
                })
            );
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// REFRESH PASSWORD USER
export const refreshPasswordUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/refreshPWD/${props.id}`, {
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const process = await axiosUtils.adminGet(`/getUser/${props.id}`);
            const { data } = process;
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    edit: {
                        ...props.state.set.edit,
                        itemData: data,
                    },
                    message: {
                        upd: resPut.message,
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    ...props.state.toggle,
                    modalDelete: false,
                    modalStatus: false,
                    alertModal: true,
                })
            );
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// BLOCK AND UNBLOCK USER
export const blockAndUnblockUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/blockAndUnBlock/${props.id}`, {
        status: props.blockUser,
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const process = await axiosUtils.adminGet(`/getUser/${props.id}`);
            const { data } = process;
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    edit: {
                        ...props.state.set.edit,
                        itemData: data,
                    },
                    message: {
                        upd: resPut.message,
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    ...props.state.toggle,
                    modalDelete: false,
                    modalStatus: false,
                    alertModal: true,
                })
            );
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// CHANGE USDT
export const SVchangeUsdt = async (props = {}) => {
    const resPost = await axiosUtils.adminPost(`/addDeposit/${props.id}`, {
        USDT: props.USDT,
    });
    console.log(resPost);
};
// GIVE USD
export const updateUSDGift = async (props = {}) => {
    const resPut = await axiosUtils.adminPost(`/giveUSD/${props.id}`, {
        usd: parseFloat(props.usd),
        token: props.data?.token,
    });
    switch (resPut.code) {
        case 0:
            const process = await axiosUtils.adminGet(`/getUser/${props.id}`);
            const { data } = process;
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    edit: {
                        ...props.state.set.edit,
                        itemData: data,
                    },
                    changeCoin: '',
                    quantityCoin: '',
                    message: {
                        upd: resPut.message,
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    ...props.state.toggle,
                    modalDelete: false,
                    modalStatus: false,
                    alertModal: true,
                })
            );
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};

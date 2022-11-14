import {
    axiosUtils,
    searchUtils,
    dispatchDelete,
    dispatchEdit,
} from '../utils';
// GET DATA USERS
export const getUsers = async (props = {}) => {
    const processUsers = await axiosUtils.adminGet(
        `/getAllUser?page=${props.page}&show=${props.show}`
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
        const processCoins = await axiosUtils.coinGet(`/getAllCoin`);
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
                    dataSettingCoin: processCoins,
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
                ...props.state.set.message,
                error: props.err?.response?.data,
            },
        })
    );
};
// EDIT RANK/FEE USER
export const handleUpdateRankFeeUser = async (props = {}) => {
    const object = props.fee
        ? {
              fee: props.fee,
              token: props.data?.token,
          }
        : {
              rank:
                  props.statusUpdate.toUpperCase() ||
                  props.statusCurrent.toUpperCase(),
              token: props.data?.token,
          };
    const resPut = await axiosUtils.adminPut(
        `/updateRankUser/${props.id}`,
        object
    );
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
            return props.data;
        default:
            break;
    }
};
// CHANGE PASSWORD USER BY ID
export const changePassword = async (props = {}) => {};
// DELETE USERS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`/deleteUser/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `/getAllUser?page=${props.page}&show=${props.show}`
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
// CHANGE COIN GIFTS VALUE
export const changeCoinGifts = async (props = {}) => {
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            changeCoin: props.coin,
        })
    );
    props.dispatch(
        props.actions.toggleModal({
            ...props.state.toggle,
            selectStatus: !props.selectStatus,
        })
    );
};
// UPDATE COIN
export const updateCoinGift = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/changeCoin/${props.id}`, {
        coin: props.changeCoin,
        quantity: parseFloat(props.quantityCoin),
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
            break;
        case 1:
        case 2:
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    message: {
                        ...props.state.set.message,
                        error: resPut.message,
                    },
                })
            );
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// SEARCH COIN GIFT
export const searchCoinGift = (props = {}) => {
    let DataCoinFlag = props.dataCoins;
    if (props.coin) {
        DataCoinFlag = DataCoinFlag.filter((item) => {
            return searchUtils.searchInput(props.coin, item.name);
        });
    }
    return DataCoinFlag;
};
// CHANG PASSWORD USER BY ID
export const changePasswordUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/changePWDForUser/${props.id}`, {
        pwd: props.password,
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    ...props.state.toggle,
                    modalDelete: false,
                })
            );
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// BLOCK/UNBLOCK USER
export const blockUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/blockUser/${props.id}`, {
        blockUser: props.blockUser,
        token: props.data?.token,
    });
    console.log(resPut);
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
            break;
        default:
            break;
    }
    window.scroll({
        top: 0,
        behavior: 'smooth',
    });
};
// UNBLOCK USER
export const unblockUser = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`/unBlockUser/${props.id}`, {
        blockUser: props.blockUser,
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
                        ...props.state.set.message,
                        upd: resPut.message,
                    },
                })
            );
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

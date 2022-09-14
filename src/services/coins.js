import {
    axiosUtils,
    dispatchCreate,
    dispatchEdit,
    dispatchDelete,
    searchUtils,
} from '../utils';
import routers from '../routers/routers';
// GET DATA COINS
export const getCoins = async (props = {}) => {
    const processCoins = await axiosUtils.coinGet(
        `getAllCoin?page=${props.page}&show=${props.show}`
    );
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataSettingCoin: processCoins,
            },
        })
    );
};
// GET COIN BY ID
export const getCoinById = async (props = {}) => {
    if (props.idCoin) {
        const res = await axiosUtils.coinGet(`getCoin/${props.idCoin}`);
        const processUser = await axiosUtils.adminGet('getAllUser');
        const { data } = res;
        const unShowList =
            data.unshow.length > 1
                ? data.unshow
                : data.unshow.length === 1
                ? data.unshow[0].split(',').filter((x) => x)
                : [];
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                form: {
                    ...props.state.set.form,
                    nameCoin: data.name,
                    symbolCoin: data.symbols,
                    indexCoin: data.index,
                    logo: [data.logo],
                    fullName: data.fullName,
                },
                data: {
                    ...props.state.set.data,
                    dataBlacklistUser: unShowList.reduce((acc, item) => {
                        processUser.dataUser.map((user) => {
                            if (user.payment.email === item) {
                                acc.push(user);
                            }
                        });
                        props.setDataUserFake(acc);
                        return acc;
                    }, []),
                    dataUser: processUser,
                },
                edit: {
                    ...props.state.set.edit,
                    id: data._id,
                    itemData: data,
                },
            })
        );
    }
};
// CHECK VALIDITY OF COINS
export const checkFormCoins = (props = {}) => {
    if (!props.nameCoin) {
        props.refNameCoin.current.focus();
        return false;
    } else if (!props.symbolCoin) {
        props.refSymbolCoin.current.focus();
        return false;
    } else if (!props.fullName) {
        props.refFullName.current.focus();
        return false;
    } else if (!props.logo) {
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                message: {
                    ...props.state.set.message,
                    error: `Please upload logo`,
                },
            })
        );
        props.dispatch(
            props.actions.toggleModal({
                ...props.state.toggle,
                alertModal: true,
            })
        );
        return false;
    }
    return true;
};
// CHECK ERROR ACTIONS
export const checkErrorCoins = (props = {}) => {
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
// SEARCH COINS
export const searchCoins = (props = {}) => {
    let dataSettingFlag = props.dataSettingCoin; //.data
    if (props.settingCoin) {
        dataSettingFlag = dataSettingFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.settingCoin, item._id) ||
                searchUtils.searchInput(props.settingCoin, item.name) ||
                searchUtils.searchInput(props.settingCoin, item.createAt)
            );
        });
    }
    return dataSettingFlag;
};
// SEARCH BLACKLIST USERS
export const searchBlacklistUsers = (props = {}) => {
    let searchDataFlag = props.dataUser; //.dataUser
    if (props.userBlacklist) {
        searchDataFlag = searchDataFlag.filter((item) => {
            return (
                searchUtils.searchInput(
                    props.userBlacklist,
                    item.payment.email
                ) ||
                searchUtils.searchInput(props.userBlacklist, item.payment.name)
            );
        });
    }
    return searchDataFlag;
};
// CREATE COINS
export const handleCreate = async (props = {}) => {
    const form = {
        nameCoin: props.nameCoin,
        symbolCoin: props.symbolCoin,
        indexCoin: props.indexCoin,
        fullName: props.fullName,
        logo: props.logo,
        hideAllUser: props.hideAllUser,
        dataBlacklistUser: props.hideAllUser
            ? props.dataUser.dataUser
            : props.dataBlacklistUser,
    };
    const unShowList = form.dataBlacklistUser.reduce((acc, item) => {
        acc += `${item.payment.email},`;
        return acc;
    }, '');
    const resPost = await axiosUtils.coinPost(
        'add',
        {
            logo: form.logo[0],
            name: form.nameCoin,
            symbol: form.symbolCoin,
            fullname: form.fullName,
            unshow: unShowList,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props.data?.token,
            },
        }
    );
    switch (resPost.code) {
        case 1:
            props.history(`${routers.settingCoin}`);
            const res = await axiosUtils.coinGet(
                `getAllCoin?page=${props.page}&show=${props.show}`
            );
            dispatchCreate(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataSettingCoin',
                resPost.message
            );
            return props.data;
        default:
            break;
    }
};
// UPDATE COINS
export const handleUpdate = async (props = {}) => {
    const form = {
        nameCoin: props.nameCoin,
        symbolCoin: props.symbolCoin,
        indexCoin: props.indexCoin,
        fullName: props.fullName,
        logo: props.logo,
        hideAllUser: props.hideAllUser,
        dataBlacklistUser: props.hideAllUser
            ? props.dataUser.dataUser
            : props.dataBlacklistUser,
    };
    const unshowList = form.dataBlacklistUser.reduce((acc, item) => {
        acc += `${item.payment.email},`;
        return acc;
    }, '');
    const resPut = await axiosUtils.coinPut(
        `updateCoin/${props.id}`,
        {
            logo: form.logo[0],
            name: form.nameCoin,
            symbols: form.symbolCoin,
            fullName: form.fullName,
            unshow: [unshowList],
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                token: props.data?.token,
            },
        }
    );
    switch (resPut.code) {
        case 0:
            props.history(`${routers.settingCoin}`);
            const res = await axiosUtils.coinGet(
                `getAllCoin?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataSettingCoin',
                resPut.message
            );
            return props.data;
        case 1:
                props.dispatch(props.actions.setData({
                    ...props.state.set,
                    message: {
                        ...props.state.message,
                        error: resPut.message,
                    }
                }))
                break;
        default:
            break;
    }
};

// DELETE COINS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.coinDelete(`deleteCoin/${props.id}`, {
        headers: {
            token: props.data.token,
        },
    });
    switch (resDel.code) {
        case 0:
            const res = await axiosUtils.coinGet(
                `getAllCoin?page=${props.page}&show=${props.show}`
            );
            dispatchDelete(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataSettingCoin',
                resDel.message
            );
            return props.data;
        default:
            break;
    }
};
// ONCLICK EDIT COINS
export const onClickEdit = async (props = {}) => {
    const dataUser = await axiosUtils.adminGet('getAllUser');
    const data =
        props.item.unshow.length > 1
            ? props.item.unshow
            : props.item.unshow.length === 1
            ? props.item.unshow[0].split(',').filter((x) => x)
            : [];
    return props.dispatch(
        props.actions.setData({
            ...props.state.set,
            form: {
                ...props.state.set.form,
                nameCoin: props.item.name,
                symbolCoin: props.item.symbols,
                indexCoin: props.item.index,
                logo: [props.item.logo],
                fullName: props.item.fullName,
            },
            data: {
                ...props.state.set.data,
                dataBlacklistUser: data.reduce((acc, item) => {
                    dataUser.dataUser.map((user) => {
                        if (user.payment.email === item) {
                            acc.push(user);
                        }
                    });
                    return acc;
                }, []),
            },
            edit: {
                ...props.state.set.edit,
                id: props.item._id || props.item.id,
                itemData: props.item,
            },
        })
    );
};
// HANDLE APPLY BLACKLIST USERS
export const handleApplyBlacklist = async (props = {}) => {
    if (props.userBlacklist) {
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                data: {
                    ...props.state.set.data,
                    dataBlacklistUser: props.dataUserFake,
                },
                searchValues: {
                    ...props.state.set.searchValues,
                    userBlacklist: '',
                },
                message: {
                    ...props.state.set.message,
                    del: '',
                },
            })
        );
    }
};
// HANDLE DELETE BLACKLIST USERS
export const handleDeleteBlacklist = async (props = {}) => {
    await 1;
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataBlacklistUser: props.dataUserFake.filter(
                    (item) => item._id !== props.id
                ),
            },
            // edit: { ...state.set.edit, id: '' },
            message: {
                ...props.state.set.message,
                del: `Xoá thành công user blacklist - Delete successfully | id: ${props.id}`,
            },
        })
    );
    props.dispatch(
        props.actions.toggleModal({
            ...props.state.toggle,
            modalDelete: false,
            alertModal: true,
        })
    );
    props.setDataUserFake(
        props.dataUserFake.filter((item) => item._id !== props.id)
    );
};

import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
} from '../utils';

// GET DATA BUYS
export const getSells = async (props = {}) => {
    const processSells = await axiosUtils.adminGet(
        `/getAllSell?page=${props.page}&show=${props.show}`
    );
    const processUser = await axiosUtils.adminGet('/getAllUser');
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataSell: processSells,
                dataUser: processUser,
            },
        })
    );
};
// CHECK ERROR ACTIONS
export const checkErrorSells = (props = {}) => {
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
// SEARCH DATA BUYS
export const searchSells = (props = {}) => {
    let dataSellFlag =
        props.dataSell &&
        props.dataSell?.data?.filter((x) => x?.type === 'SellCoin');
    if (props.sell) {
        dataSellFlag = dataSellFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.sell, item._id) ||
                searchUtils.searchInput(props.sell, item.buyer.gmailUSer) ||
                searchUtils.searchInput(props.sell, item.status)
            );
        });
    }
    return dataSellFlag;
};
// UPDATE STATUS/FEE BUYS
export const handleUpdateStatusFeeSell = async (props = {}) => {
    const object = props.fee
        ? {
              fee: props.fee,
              token: props.data?.token,
          }
        : {
              status: props.statusUpdate || props.statusCurrent,
              token: props.data?.token,
          };
    const resPut = await axiosUtils.adminPut(
        `/handleSellCoin/${props.id}`,
        object
    );
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllSell?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataSell',
                resPut.message
            );
            return props.data;
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
};
// DELETE BUYS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`/deleteSell/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    switch (resDel.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `/getAllSell?page=${props.page}&show=${props.show}`
            );
            dispatchDelete(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataSell',
                resDel.message
            );
            return props.data;
        case 1:
        case 2:
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    message: {
                        ...props.state.set.message,
                        error: resDel.message,
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
};

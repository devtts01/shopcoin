import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
} from '../utils';

// GET DATA BUYS
export const getBuys = async (props = {}) => {
    const processBuys = await axiosUtils.adminGet(
        `getAllBuy?page=${props.page}&show=${props.show}`
    );
    const processUser = await axiosUtils.adminGet('getAllUser');
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataBuy: processBuys,
                dataUser: processUser,
            },
        })
    );
};
// GET BUY/SELL BY ID
export const getBuySellById = async (props = {}) => {
    if (props.idBuy || props.idSell) {
        const processUser = await axiosUtils.adminGet('getAllUser');
        const process = await axiosUtils.adminGet(
            props.idBuy ? `getBuy/${props.idBuy}` : `getSell/${props.idSell}`
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
export const checkErrorBuys = (props = {}) => {
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
export const searchBuys = (props = {}) => {
    let dataBuyFlag =
        props.dataBuy &&
        props.dataBuy?.sells?.filter((x) => x.type === 'BuyCoin');
    if (props.buy) {
        dataBuyFlag = dataBuyFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.buy, item._id) ||
                searchUtils.searchInput(props.buy, item.buyer.gmailUSer) ||
                searchUtils.searchInput(props.buy, item.status)
            );
        });
    }
    return dataBuyFlag;
};
// UPDATE STATUS/FEE BUYS
export const handleUpdateStatusFeeBuy = async (props = {}) => {
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
        `handleBuyCoin/${props.id}`,
        object
    );
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllBuy?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataBuy',
                resPut.message
            );
            return props.data;
        default:
            break;
    }
};
// DELETE BUYS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`deleteBuy/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    switch (resDel.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllBuy?page=${props.page}&show=${props.show}`
            );
            dispatchDelete(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataBuy',
                resDel.message
            );
            return props.data;
        default:
            break;
    }
};

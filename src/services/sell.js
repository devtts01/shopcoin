import {
    axiosUtils,
    searchUtils,
    dispatchEdit,
    dispatchDelete,
    validates,
} from '../utils';

// GET DATA BUYS
export const getSells = async (props = {}) => {
    const processSells = await axiosUtils.adminGet(
        `/getAllSell?page=${props.page}&show=${props.show}&search=${props.search}`
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
                searchUtils.searchInput(props.sell, item?.amountUsd) ||
                searchUtils.searchInput(props.sell, item?.amount) ||
                searchUtils.searchInput(props.sell, item?.symbol) ||
                searchUtils.searchInput(props.sell, item?.createdAt) ||
                searchUtils.searchInput(props.sell, item?.createBy) ||
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
              note: props.note,
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
            validates.validateCase1_2(resPut, props);
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
            validates.validateCase1_2(resDel, props);
            break;
        default:
            break;
    }
};

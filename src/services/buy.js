import {
    axiosUtils,
    searchUtils
} from '../utils';

// GET DATA BUYS
export const getBuys= async (props = {}) => {
    const processBuys = await axiosUtils.adminGet(`getAllBuy?page=${props.page}&show=${props.show}`);
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
        const process = await axiosUtils.adminGet(props.idBuy ? 
            `getBuy/${props.idBuy}` : `getSell/${props.idSell}`
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
                }
            })
        );
    }
}
// SEARCH DATA BUYS
export const searchBuys = (props = {}) => {
    let dataBuyFlag = props.dataBuy && props.dataBuy?.sells?.filter(x => x.type === 'BuyCoin');
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
}
// UPDATE STATUS BUYS
export const handleUpdate = async (props = {}) => {
    const resPut = await axiosUtils.adminPut(`handleBuyCoin/${props.id}`, {
        status: props.statusUpdate || props.statusCurrent,
        token: props.data?.token,
    });
    console.log(resPut)
}
import {
    axiosUtils,
    searchUtils
} from '../utils';

// GET DATA BUYS
export const getSells= async (props = {}) => {
    const processSells = await axiosUtils.adminGet(`getAllBuy?page=${props.page}&show=${props.show}`);
        const processUser = await axiosUtils.adminGet('getAllUser');
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
// SEARCH DATA BUYS
export const searchSells = (props = {}) => {
    let dataSellFlag = props.dataSell && props.dataSell?.sells?.filter(x => x.type === 'SellCoin');
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
}
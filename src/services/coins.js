import routers from '../routers/routers';
import { axiosUtils, searchUtils } from '../utils';

// SEARCH BANK ADMIN USER
export const searchBankAdminUser = (props = {}) => {
    let dataFlag = props.data; //.data
    if (props.bank) {
        dataFlag = dataFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.bank, item.accountName) ||
                searchUtils.searchInput(props.bank, item.accountNumber) ||
                searchUtils.searchInput(props.bank, item.code) ||
                searchUtils.searchInput(props.bank, item.methodName) ||
                searchUtils.searchInput(props.bank, item.name)
            );
        });
    }
    return dataFlag;
};
// SEARCH HISTORY BUY COINS
export const searchHistoryBuyCoins = (props = {}) => {
    let dataFlag = props.data; //.data
    if (props.buyHistory) {
        dataFlag = dataFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.buyHistory, item._id) ||
                searchUtils.searchInput(props.buyHistory, item.symbol) ||
                searchUtils.searchInput(props.buyHistory, item.createdAt) ||
                searchUtils.searchInput(
                    props.buyHistory.toString(),
                    item.amount
                ) ||
                searchUtils.searchInput(
                    props.buyHistory.toString(),
                    item.amountUsd
                ) ||
                searchUtils.searchInput(
                    props.buyHistory.toString(),
                    item.status
                )
            );
        });
    }
    return dataFlag;
};
// SEARCH HISTORY SELL COINS
export const searchHistorySellCoins = (props = {}) => {
    let dataFlag = props.data; //.data
    if (props.sellHistory) {
        dataFlag = dataFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.sellHistory, item._id) ||
                searchUtils.searchInput(props.sellHistory, item.symbol) ||
                searchUtils.searchInput(props.sellHistory, item.createdAt) ||
                searchUtils.searchInput(
                    props.sellHistory.toString(),
                    item.amount
                ) ||
                searchUtils.searchInput(
                    props.sellHistory.toString(),
                    item.amountUsd
                )
            );
        });
    }
    return dataFlag;
};
// HANDLE BUY COIN USER
export const handleBuyCoin = async (props = {}) => {
    const resPost = await axiosUtils.userPost('/BuyCoin', {
        gmailUser: props?.gmailUser,
        amount: props?.amount,
        amountUsd: props?.amountUsd, //amount * price
        symbol: props?.symbol,
        price: props?.price, // api
        type: 'BuyCoin',
        token: props?.token,
    });
    switch (resPost.code) {
        case 0:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resPost?.message
                            ? resPost?.message
                            : 'Buy coin successfully',
                        error: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                })
            );
            props.history(routers.homeUser);
            break;
        case 1:
        case 2:
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: resPost?.message
                            ? resPost?.message
                            : 'Buy coin failed',
                        cre: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                })
            );
            props.history(routers.homeUser);
            break;
        default:
            break;
    }
};
// HANDLE SELL COIN USER
export const handleSellCoin = async (props = {}) => {
    const resPost = await axiosUtils.userPost('/SellCoin', {
        gmailUser: props?.gmailUser,
        amount: props?.amount,
        amountUsd: props?.amountUsd, //amount * price
        symbol: props?.symbol,
        price: props?.price, // api
        type: 'SellCoin',
        token: props?.token,
    });
    switch (resPost.code) {
        case 0:
            props.setIsProcess(false);
            props.setIsProcessAll(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        cre: resPost?.message
                            ? resPost?.message
                            : 'Sell coin successfully',
                        error: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                })
            );
            props.history(routers.homeUser);
            break;
        case 1:
        case 2:
            props.setIsProcess(false);
            props.setIsProcessAll(false);
            props.dispatch(
                props.actions.setData({
                    message: {
                        error: resPost?.message
                            ? resPost?.message
                            : 'Sell coin failed',
                        cre: '',
                        upd: '',
                        del: '',
                    },
                })
            );
            props.dispatch(
                props.actions.toggleModal({
                    alertModal: true,
                })
            );
            props.history(routers.homeUser);
            break;
        default:
            break;
    }
};

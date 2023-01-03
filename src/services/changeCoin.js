import { axiosUtils, dispatchDelete, validates } from '../utils';

// GET DATA CHANGE COIN
export const getChangeCoin = async (props = {}) => {
    const processChangeCoin = await axiosUtils.adminGet(
        `/getTotalChangeCoin?page=${props.page}&show=${props.show}&search=${props.search}`
    );
    const processUser = await axiosUtils.adminGet('/getAllUser');
    const res = await axiosUtils.coinGet(
        `/getAllCoin?page=${props.page}&show=${
            props.dataSettingCoin?.total || 10
        }`
    );
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataChangeCoins: processChangeCoin,
                dataUser: processUser,
                dataSettingCoin: res,
            },
        })
    );
};

// CHECK ERROR ACTIONS
export const checkErrorChangeCoin = (props = {}) => {
    return props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                error: props.err?.response?.data,
            },
        })
    );
};
// CHANGE COIN API
export const changeCoinGiftsSUB = async (props = {}) => {
    const resPut = await axiosUtils.adminPost(
        `/changeCoinNegative/${props.email}`,
        {
            coin: props.coin,
            quantity: parseFloat(props.quantityCoin),
            createBy: props.createBy,
            time: props.time,
            token: props.data?.token,
        }
    );
    switch (resPut.code) {
        case 0:
            const processChangeCoin = await axiosUtils.adminGet(
                `/getTotalChangeCoin?page=${props.page}&show=${props.show}&search=${props.search}`
            );
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    changeCoin: '',
                    quantityCoin: '',
                    message: {
                        upd: resPut.message,
                    },
                    data: {
                        ...props.state.set.data,
                        dataChangeCoins: processChangeCoin,
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
            props.setIsProcess(false);
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            props.setIsProcess(false);
            props.dispatch(
                props.actions.setData({
                    quantityCoin: '',
                    changeCoin: '',
                })
            );
            break;
        default:
            break;
    }
    // window.scroll({
    //     top: 0,
    //     behavior: 'smooth',
    // });
};
//  DELETE CHANGE COIN
export const deleteChangeCoin = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(
        `/deleteChangeCoin/${props.id}`,
        {
            headers: {
                token: props.data?.token,
            },
        }
    );
    const res = await axiosUtils.adminGet(
        `/getTotalChangeCoin?page=${props.page}&show=${props.show}&search=${props.search}`
    );
    dispatchDelete(
        props.dispatch,
        props.state,
        props.actions,
        res,
        'dataChangeCoins',
        resDel.message
    );
};

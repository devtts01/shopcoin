import { axiosUtils, dispatchEdit } from '../utils';

// GET DATA RATE
export const getRates = async (props = {}) => {
    const processRate = await axiosUtils.adminGet('/getRates');
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataRate: processRate,
            },
        })
    );
};
// UPDATE ALL RATE
export const SVupdateRate = async (props = {}) => {
    const resPut = await axiosUtils.adminPut('/changeRates', {
        rateDeposit: props.rateDeposit,
        rateWithdraw: props.rateWithdraw,
        token: props.token,
    });
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet('/getRates');
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataRate',
                resPut.message
            );
            return props.data;
        case 1:
        case 2:
            props.dispatch(
                props.actions.setData({
                    ...props.state.set,
                    message: {
                        // ...props.state.set.message,
                        error: resPut.message,
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
        default:
            break;
    }
};

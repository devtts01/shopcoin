import { axiosUtils, validates } from '../utils';

export const SVtotal = async (props = {}) => {
    const objectBody =
        props?.fromDate && props?.toDate
            ? {
                  from: props.fromDate,
                  to: props.toDate,
              }
            : {};
    const resPostDeposit = await axiosUtils.adminPost(
        '/totalDeposit',
        objectBody
    );
    const resPostWithdraw = await axiosUtils.adminPost(
        '/totalWithdraw',
        objectBody
    );
    const resPostBalance = await axiosUtils.adminPost('/totalBalance', {});
    const resGetCommission = await axiosUtils.adminGet('/getCommission', {});
    props.dispatch(
        props.actions.setData({
            totalDeposit: resPostDeposit?.data,
            totalWithdraw: resPostWithdraw?.data,
            totalBalance: resPostBalance?.data?.total,
            totalCommission: resGetCommission?.data?.commission,
            dataUserBalance: resPostBalance?.data,
        })
    );
};
// UPDATE ALL RATE
export const SVupdateRate = async (props = {}) => {
    const resPut = await axiosUtils.adminPut('/updateRateBuySell', {
        percent: props.rate,
        token: props?.token,
    });
    switch (resPut.code) {
        case 0:
            validates.validateCase0(resPut, 'upd', props);
            break;
        case 1:
        case 2:
            validates.validateCase1_2(resPut, props);
            break;
        default:
            break;
    }
};

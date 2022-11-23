import { axiosUtils } from '../utils';

export const SVtotal = async (props = {}) => {
    const objectBody =
        props?.fromDate && props?.toDate
            ? {
                  from: props.fromDate,
                  to: props.toDate,
              }
            : {};
    const resPostDeposit = await axiosUtils.adminGet(
        '/totalDeposit',
        objectBody
    );
    const resPostWithdraw = await axiosUtils.adminGet(
        '/totalWithdraw',
        objectBody
    );
    const resPostBalance = await axiosUtils.adminGet('/totalBalance', {});
    console.log(resPostBalance);
    // const resPostCommission = await axiosUtils.adminGet('/Commission', {});
    props.dispatch(
        props.actions.setData({
            totalDeposit: resPostDeposit.data,
            totalWithdraw: resPostWithdraw.data,
            totalBalance: resPostBalance.data.total,
            // totalCommission: resPostCommission.data.commission,
            dataUserBalance: resPostBalance.data,
        })
    );
};

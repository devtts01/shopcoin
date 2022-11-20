import { axiosUtils } from '../utils';

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
    props.dispatch(
        props.actions.setData({
            totalDeposit: resPostDeposit.data,
            totalWithdraw: resPostWithdraw.data,
            totalBalance: resPostBalance.data.total,
            dataUserBalance: resPostBalance.data,
        })
    );
};

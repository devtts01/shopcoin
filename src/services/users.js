import {
    axiosUtils,
    searchUtils,
    dispatchDelete
} from '../utils';
// GET DATA USERS
export const getUsers = async (props = {}) => {
    const processUsers = await axiosUtils.adminGet(
        `getAllUser?page=${props.page}&show=${props.show}`
    );
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            data: {
                ...props.state.set.data,
                dataUser: processUsers,
            },
        })
    );
};
// SEARCH DATA USERS
export const searchUsers = (props = {}) => {
    let dataUserFlag = props.dataUser;
    if (props.user) {
        dataUserFlag = dataUserFlag.filter((item) => {
            return (
                searchUtils.searchInput(props.user, item.payment.username) ||
                searchUtils.searchInput(props.user, item.payment.email) ||
                searchUtils.searchInput(props.user, item.payment.rule) ||
                searchUtils.searchInput(props.user, item.rank)
            );
        });
    }
    return dataUserFlag;
}
// CHECK ERROR ACTIONS
export const checkErrorUsers = (props = {}) => {
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
// DELETE USERS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`deleteUser/${props.id}`,{
        headers: {
            token: props.data?.token
        }
    });
    const res = await axiosUtils.adminGet(`getAllUser?page=${props.page}&show=${props.show}`);
    dispatchDelete(props.dispatch, props.state, props.actions, res, 'dataUser', resDel.message)
}
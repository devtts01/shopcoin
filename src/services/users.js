import {
    axiosUtils,
    searchUtils,
    dispatchDelete,
    dispatchEdit,
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
// GET USER BY ID
export const getUserById = async (props = {}) => {
    if (props.idUser) {
        const process = await axiosUtils.adminGet(`getUser/${props.idUser}`);
        const { user } = process;
        props.dispatch(
            props.actions.setData({
                ...props.state.set,
                edit: {
                    ...props.state.set.edit,
                    itemData: user,
                },
            })
        );
    }
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
};
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
// EDIT RANK/FEE USER
export const handleUpdateRankFeeUser = async (props = {}) => {
    const object = props.fee
        ? {
              fee: props.fee,
              token: props.data?.token,
          }
        : {
              status: props.statusUpdate || props.statusCurrent,
              token: props.data?.token,
          };
    const resPut = await axiosUtils.adminPut(`handleUser/${props.id}`, object);
    switch (resPut.code) {
        case 0:
            const res = await axiosUtils.adminGet(
                `getAllUser?page=${props.page}&show=${props.show}`
            );
            dispatchEdit(
                props.dispatch,
                props.state,
                props.actions,
                res,
                'dataUser',
                resPut.message
            );
            return props.data;
        default:
            break;
    }
};
// DELETE USERS
export const handleDelete = async (props = {}) => {
    const resDel = await axiosUtils.adminDelete(`deleteUser/${props.id}`, {
        headers: {
            token: props.data?.token,
        },
    });
    const res = await axiosUtils.adminGet(
        `getAllUser?page=${props.page}&show=${props.show}`
    );
    dispatchDelete(
        props.dispatch,
        props.state,
        props.actions,
        res,
        'dataUser',
        resDel.message
    );
};

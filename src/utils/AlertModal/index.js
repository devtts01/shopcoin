export const closeAlert = (dispatch, state, actions) => {
    dispatch(
        actions.toggleModal({
            ...state.toggle,
            alertModal: false,
        })
    );
    dispatch(
        actions.setData({
            ...state.set,
            message: {
                del: '',
                upd: '',
                cre: '',
                error: '',
                success: '',
            },
        })
    );
};

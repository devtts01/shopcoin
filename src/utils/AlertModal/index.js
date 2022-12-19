export const closeAlert = (dispatch, state, actions) => {
    dispatch(
        actions.toggleModal({
            alertModal: false,
        })
    );
    dispatch(
        actions.setData({
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

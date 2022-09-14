export const deleteTrue = (e, id, dispatch, state, actions) => {
    e.stopPropagation();
    dispatch(actions.toggleModal({ ...state.toggle, modalDelete: true }));
    dispatch(
        actions.setData({
            ...state.set,
            edit: { ...state.set.edit, id },
        })
    );
};
export const statusTrue = (e, status, id, dispatch, state, actions) => {
    e.stopPropagation();
    dispatch(actions.toggleModal({ ...state.toggle, modalStatus: true }));
    dispatch(
        actions.setData({
            ...state.set,
            edit: { ...state.set.edit, id },
            statusCurrent: status,
        })
    );
};
export const deleteFalse = (e, dispatch, state, actions) => {
    e.stopPropagation();
    dispatch(actions.toggleModal({ ...state.toggle, modalDelete: false }));
};
export const statusFalse = (e, dispatch, state, actions) => {
    e.stopPropagation();
    dispatch(
        actions.toggleModal({
            ...state.toggle,
            modalStatus: false,
            selectStatus: false,
        })
    );
    dispatch(
        actions.setData({
            ...state.set,
            statusCurrent: '',
            statusUpdate: '',
        })
    );
};

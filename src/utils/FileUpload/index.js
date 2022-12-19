export const handleChange = (files, dispatch, state, actions) => {
    dispatch(
        actions.setData({
            form: {
                ...state.set.form,
                logo: files,
            },
        })
    );
};
export const handleRejected = (fileRejections, dispatch, state, actions) => {
    dispatch(
        actions.setData({
            fileRejections: [fileRejections[0]],
        })
    );
};
export const handleRemove = (dispatch, state, actions) => {
    dispatch(
        actions.setData({
            form: {
                ...state.set.form,
                logo: null,
            },
            fileRejections: [],
        })
    );
};

export const changeForm = (e, dispatch, state, actions) => {
    const { name, value } = e.target;
    if (value.charAt(0) === ' ') {
        return;
    } else {
        dispatch(
            actions.setData({
                ...state.set,
                form: {
                    ...state.set.form,
                    [name]: value,
                },
            })
        );
    }
};

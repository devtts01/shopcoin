export const changeForm = (e, dispatch, state, actions) => {
    const { name, value } = e.target;
    if (value.charAt(0) === ' ') {
        return;
    } else {
        dispatch(
            actions.setData({
                form: {
                    ...state.set.form,
                    [name]: value,
                },
            })
        );
    }
};

export const validateCase1_2 = (res, props) => {
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                error: res.message,
            },
        })
    );
    props.dispatch(
        props.actions.toggleModal({
            ...props.state.toggle,
            modalDelete: false,
            modalStatus: false,
            alertModal: true,
        })
    );
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

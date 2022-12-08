export const validateCase0 = (res, typeMsg, props) => {
    props.dispatch(
        props.actions.setData({
            ...props.state.set,
            message: {
                [typeMsg]: res.message,
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
};

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
    window.screenTop({
        top: 0,
        behavior: 'smooth',
    });
};

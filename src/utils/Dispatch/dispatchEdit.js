const dispatchEdit = (dispatch, state, actions, data, nameData, message) => {
    dispatch(
        actions.setData({
            ...state.set,
            statusUpdate: '',
            statusCurrent: '',
            fee: '',
            message: {
                // ...state.set.message,
                upd: message ? message : 'Updated Success',
                error: '',
                cre: '',
                del: '',
            },
            data: {
                ...state.set.data,
                [nameData]: data,
            },
            edit: { ...state.set.edit, id: '', itemData: null, data: null },
            form: {
                username: '',
                email: '',
                password: '',
                oldPassword: '',
                confirmPassword: '',
                accountName: '',
                bankName: '',
                accountNumber: '',
                nameCoin: '',
                fullName: '',
                rateDeposit: 0,
                rateWithdraw: 0,
                symbolCoin: '',
                indexCoin: '',
                imageCoin: null,
            },
        })
    );
    dispatch(
        actions.toggleModal({
            ...state.toggle,
            modalPaymentEdit: false,
            modalStatus: false,
            alertModal: true,
        })
    );
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export default dispatchEdit;

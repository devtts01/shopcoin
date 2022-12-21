const DataWithdrawUser = () => {
    return {
        headers: {
            name: process.env.REACT_APP_WITHDRAW_USER_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Symbol',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Amount',
            },
            h3: {
                title: 'Price',
            },
            h4: {
                title: 'Created At',
            },
            h5: {
                title: 'Bank',
            },
            h6: {
                title: 'Status',
            },
        },
    };
};

export default DataWithdrawUser;

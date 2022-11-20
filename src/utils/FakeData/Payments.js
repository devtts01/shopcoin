const DataPayments = () => {
    return {
        headers: {
            name: process.env.REACT_APP_PAYMENT_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Account Name',
            },
            h2: {
                title: 'Bank Name',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h3: {
                title: 'Account Number',
            },
            h4: {
                title: 'Rate Deposit',
            },
            h5: {
                title: 'Rate Withdraw',
            },
            h6: {
                title: 'Type',
            },
        },
    };
};

export default DataPayments;

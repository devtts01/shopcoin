const DataRates = () => {
    return {
        headers: {
            name: process.env.REACT_APP_RATE_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Rate Deposit',
            },
            h2: {
                title: 'Rate Withdraw',
            },
            h3: {
                title: 'Created At',
            },
        },
    };
};

export default DataRates;

const DataSellHistoryUser = () => {
    return {
        headers: {
            name: process.env.REACT_APP_SELL_HISTORY_USER_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Coin name',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Amount',
            },
            h3: {
                title: 'Price',
            },
            h4: {
                title: 'USD currency',
            },
            h5: {
                title: 'Created At',
            },
            h6: {
                title: 'Status',
            },
        },
    };
};

export default DataSellHistoryUser;

const DataChangeCoins = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_CHANGE_COIN_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Symbol',
            },
            h2: {
                title: 'Quantity',
            },
            h3: {
                title: 'User',
            },
            h4: {
                title: 'Created At',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h5: {
                title: 'Created By',
            },
            h6: {
                title: 'Type',
            },
            h7: {
                title: 'Status',
            },
        },
    };
};

export default DataChangeCoins;

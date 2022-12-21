const DataMyCoinsUser = () => {
    return {
        headers: {
            name: process.env.REACT_APP_MY_COINS_USER_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Logo',
            },
            h2: {
                title: 'Coin name',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h3: {
                title: 'Quantity',
            },
            h4: {
                title: 'USD currency',
            },
            h5: {
                title: 'Created At',
            },
        },
    };
};

export default DataMyCoinsUser;

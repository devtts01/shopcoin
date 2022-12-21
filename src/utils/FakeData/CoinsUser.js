const DataCoinsUser = () => {
    return {
        headers: {
            name: process.env.REACT_APP_COIN_USER_NAME,
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
                title: 'High',
            },
            h4: {
                title: 'Low',
            },
            h5: {
                title: 'Created At',
            },
        },
    };
};

export default DataCoinsUser;

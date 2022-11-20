const DataCoins = () => {
    return {
        headers: {
            name: process.env.REACT_APP_SETTING_NAME,
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
                title: 'Created At',
            },
        },
    };
};

export default DataCoins;
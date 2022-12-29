const DataBuys = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_BUY_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Symbol',
            },
            h2: {
                title: 'Amount',
            },
            h3: {
                title: 'Price (USD)',
            },
            h4: {
                title: 'User',
            },
            h5: {
                title: 'Created At',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h6: {
                title: 'Created By',
            },
            h7: {
                title: 'Status',
            },
        },
    };
};

export default DataBuys;

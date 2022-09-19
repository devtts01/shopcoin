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
                title: 'User',
            },
            h4: {
                title: 'Date',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h5: {
                title: 'Status',
            },
        },
    };
};

export default DataBuys;

const DataWithdraws = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_WITHDRAW_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Code',
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
                title: 'Created By',
            },
            h6: {
                title: 'Status',
            },
        },
    };
};

export default DataWithdraws;

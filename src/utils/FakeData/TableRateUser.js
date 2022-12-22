const DataTableRateUser = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_TABLE_RATE_USER_NAME,
            h1: {
                title: 'Actions',
            },
            h2: {
                title: 'Rate (VCB)',
            },
            h3: {
                title: '',
            },
        },
    };
};

export default DataTableRateUser;

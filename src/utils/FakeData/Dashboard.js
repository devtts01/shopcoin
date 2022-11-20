const DataDashboard = () => {
    return {
        headers: {
            name: process.env.REACT_APP_DASHBOARD_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Symbol',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Amount',
            },
        },
    };
};

export default DataDashboard;

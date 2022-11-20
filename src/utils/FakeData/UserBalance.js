const DataUserBalance = () => {
    return {
        headers: {
            name: process.env.REACT_APP_DASHBOARD_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Họ và tên',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'email',
            },
            h3: {
                title: 'Balance',
            },
            h4: {
                title: 'Rule',
            },
            h5: {
                title: 'Rank',
            },
        },
    };
};

export default DataUserBalance;

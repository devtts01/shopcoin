const DataUsers = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_USER_NAME,
            index: {
                title: 'No',
            },
            h1: {
                title: 'Username',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Email',
            },
            h3: {
                title: 'Created At',
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

export default DataUsers;

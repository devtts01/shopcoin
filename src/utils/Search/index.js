export const logicSearch = (e, dispatch, state, actions) => {
    const searchValueInput = e.target.value;
    if (searchValueInput.charAt(0) === ' ') {
        return;
    } else {
        dispatch(
            actions.setData({
                ...state.set,
                searchValues: {
                    ...state.set.searchValues,
                    [e.target.name]: searchValueInput,
                },
            })
        );
    }
};
export const searchInput = (valueSearch, filed) => {
    return (
        filed && filed.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
    );
};

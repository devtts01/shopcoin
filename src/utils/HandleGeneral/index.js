export const indexTable = (page, show, index) => {
    const indexPage =
        (page - 1) * show + index + 1 < 10
            ? `0${(page - 1) * show + index + 1}`
            : (page - 1) * show + index + 1;
    return indexPage;
};

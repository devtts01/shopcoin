export const dateVn = (date) => {
    return new Date(
        date.getTime() + new Date().getTimezoneOffset() * -60 * 1000
    )
        .toISOString()
        .slice(0, 19);
};
// return date format dd.mm.yyyy
export const dateVnFormat = (date) => {
    const dateVn = new Date(
        date.getTime() + new Date().getTimezoneOffset() * -60 * 1000
    );
    const day = dateVn.getDate();
    const month = dateVn.getMonth() + 1;
    const year = dateVn.getFullYear();
    return `${day < 10 ? '0' + day : day}.${
        month < 10 ? '0' + month : month
    }.${year}`;
};
// return date format yyyy-mm-dd
export const dateVnFormat2 = (date) => {
    const dateVn = new Date(
        date.getTime() + new Date().getTimezoneOffset() * -60 * 1000
    );
    const day = dateVn.getDate();
    const month = dateVn.getMonth() + 1;
    const year = dateVn.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
    }`;
};
